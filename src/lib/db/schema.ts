import { pgTable, text, timestamp, integer, boolean, decimal, uuid, pgEnum, jsonb } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["collector", "admin"]);
export const paintingStatusEnum = pgEnum("painting_status", ["draft", "available", "auction", "sold", "reserved"]);
export const auctionStatusEnum = pgEnum("auction_status", ["scheduled", "live", "ended", "cancelled"]);
export const orderStatusEnum = pgEnum("order_status", ["pending", "paid", "shipped", "delivered", "refunded"]);
export const bidStatusEnum = pgEnum("bid_status", ["active", "outbid", "won", "cancelled"]);

// ── Users ──
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash"),
  role: roleEnum("role").default("collector").notNull(),
  avatar: text("avatar"),
  phone: text("phone"),
  shippingAddress: text("shipping_address"),
  stripeCustomerId: text("stripe_customer_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ── Paintings ──
export const paintings = pgTable("paintings", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  medium: text("medium"),
  dimensions: text("dimensions"),
  year: integer("year"),
  price: decimal("price", { precision: 10, scale: 2 }),
  currency: text("currency").default("EUR").notNull(),
  status: paintingStatusEnum("status").default("draft").notNull(),
  images: jsonb("images").$type<string[]>().default([]),
  thumbnail: text("thumbnail"),
  category: text("category"),
  isFeatured: boolean("is_featured").default(false),
  soldAt: timestamp("sold_at"),
  buyerId: uuid("buyer_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ── Auctions ──
export const auctions = pgTable("auctions", {
  id: uuid("id").defaultRandom().primaryKey(),
  paintingId: uuid("painting_id").references(() => paintings.id, { onDelete: "cascade" }).notNull(),
  startingPrice: decimal("starting_price", { precision: 10, scale: 2 }).notNull(),
  reservePrice: decimal("reserve_price", { precision: 10, scale: 2 }),
  currentBid: decimal("current_bid", { precision: 10, scale: 2 }),
  currency: text("currency").default("EUR").notNull(),
  bidIncrement: decimal("bid_increment", { precision: 10, scale: 2 }).default("10").notNull(),
  startsAt: timestamp("starts_at").notNull(),
  endsAt: timestamp("ends_at").notNull(),
  extendMinutes: integer("extend_minutes").default(5),
  status: auctionStatusEnum("status").default("scheduled").notNull(),
  winnerId: uuid("winner_id").references(() => users.id),
  totalBids: integer("total_bids").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ── Bids ──
export const bids = pgTable("bids", {
  id: uuid("id").defaultRandom().primaryKey(),
  auctionId: uuid("auction_id").references(() => auctions.id, { onDelete: "cascade" }).notNull(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  status: bidStatusEnum("status").default("active").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ── Orders ──
export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  paintingId: uuid("painting_id").references(() => paintings.id).notNull(),
  auctionId: uuid("auction_id").references(() => auctions.id),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").default("EUR").notNull(),
  stripePaymentId: text("stripe_payment_id"),
  stripeSessionId: text("stripe_session_id"),
  status: orderStatusEnum("status").default("pending").notNull(),
  shippingAddress: text("shipping_address"),
  trackingNumber: text("tracking_number"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ── Sessions ──
export const sessions = pgTable("sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
