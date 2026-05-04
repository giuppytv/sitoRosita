import { describe, expect, it } from "vitest";
import { siteData } from "./data";

describe("siteData", () => {
  it("has a WhatsApp number in international numeric format", () => {
    expect(siteData.whatsappNumber).toMatch(/^\d{10,15}$/);
  });

  it("has required contact fields", () => {
    expect(siteData.doctorName).toBeTruthy();
    expect(siteData.email).toContain("@");
    expect(siteData.phone).toBeTruthy();
  });

  it("has visible website sections populated", () => {
    expect(siteData.services.length).toBeGreaterThanOrEqual(3);
    expect(siteData.faq.length).toBeGreaterThanOrEqual(3);
    expect(siteData.testimonials.length).toBeGreaterThanOrEqual(1);
  });
});
