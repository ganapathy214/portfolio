import React from "react";
import { FormField, TabCardWrapper } from "../SetitingsCommon";

export default function ContactTab({
  renderSectionVisibilityBanner,
  localSectionTitles,
  setLocalSectionTitles,
  localContactInfo,
  updateContactInfoField
}) {
  return (
    <div className="space-y-6 animate-fadeIn text-left">
      {renderSectionVisibilityBanner("Contact")}

      <FormField
        label="Section Display Title Heading"
        value={localSectionTitles.Contact || ""}
        onChange={(val) => setLocalSectionTitles(prev => ({ ...prev, Contact: val }))}
        placeholder="e.g. Where to find me ?"
      />

      <TabCardWrapper title="Contact & Map details">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="Email Address"
            type="email"
            value={localContactInfo.email || ""}
            onChange={(val) => updateContactInfoField("email", val)}
            placeholder="email@example.com"
          />
          <FormField
            label="Phone Number"
            value={localContactInfo.phone || ""}
            onChange={(val) => updateContactInfoField("phone", val)}
            placeholder="+91 XXXXXXXXXX"
          />
        </div>

        <FormField
          label="Location Address"
          value={localContactInfo.address || ""}
          onChange={(val) => updateContactInfoField("address", val)}
          placeholder="Coimbatore, Tamil Nadu, India"
        />

        <div className="flex flex-col gap-1.5">
          <FormField
            label="Google Maps Embed URL"
            type="textarea"
            value={localContactInfo.googleMapsUrl || ""}
            onChange={(val) => updateContactInfoField("googleMapsUrl", val)}
            placeholder="https://www.google.com/maps/embed?..."
            rows={4}
          />
          <span className="text-[9px] text-stone-500 font-medium leading-relaxed mt-1">
            To get the embed URL: Search for a location in Google Maps, click "Share", choose "Embed a map", and copy the URL from the iframe src attribute.
          </span>
        </div>
      </TabCardWrapper>

      <TabCardWrapper title="Contact Form Details">
        <FormField
          label="Contact Form Title"
          value={localContactInfo.formTitle || ""}
          onChange={(val) => updateContactInfoField("formTitle", val)}
          placeholder="e.g. Send a Message"
        />
        <div className="mt-4">
          <FormField
            label="Contact Form Subtitle / Short Description"
            type="textarea"
            value={localContactInfo.formSubtitle || ""}
            onChange={(val) => updateContactInfoField("formSubtitle", val)}
            placeholder="e.g. For custom projects, consulting, or new opportunities."
            rows={2}
          />
        </div>
      </TabCardWrapper>
    </div>
  );
}
