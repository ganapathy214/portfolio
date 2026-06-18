/**
 * Utility functions to view and download PDF files.
 * Handles both base64 data URIs and static public filenames securely,
 * bypassing modern browser blocks on direct data URI navigation.
 */

/**
 * Open a PDF file in a new browser tab.
 * If base64 data URI, converts it to a Blob and opens it using URL.createObjectURL.
 * If static filename, resolves it from the assets/files directory.
 * 
 * @param {string} pdfFile - Base64 data URI or public filename string.
 */
export const openPdf = (pdfFile) => {
  if (!pdfFile) return;

  if (pdfFile.startsWith("data:")) {
    try {
      const parts = pdfFile.split(";base64,");
      const contentType = parts[0].split(":")[1] || "application/pdf";
      const raw = window.atob(parts[1]);
      const rawLength = raw.length;
      const uInt8Array = new Uint8Array(rawLength);
      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      const blob = new Blob([uInt8Array], { type: contentType });
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, "_blank");
    } catch (e) {
      console.error("Failed to open base64 PDF:", e);
      // Fallback
      window.open(pdfFile, "_blank");
    }
    return;
  }

  // Static file path resolution
  const baseUrl = import.meta.env.BASE_URL || "/";
  const cleanBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  const url = `${cleanBase}files/certification/${encodeURIComponent(pdfFile)}`;
  window.open(url, "_blank");
};

/**
 * Download a PDF file.
 * Uses Blob object URL approach to prevent size limits and browser blocks on base64.
 * 
 * @param {string} pdfFile - Base64 data URI or public file URL.
 * @param {string} defaultFileName - Fallback name of the downloaded file.
 */
export const downloadPdf = (pdfFile, defaultFileName = "document.pdf") => {
  if (!pdfFile) return;

  if (pdfFile.startsWith("data:")) {
    try {
      const parts = pdfFile.split(";base64,");
      const contentType = parts[0].split(":")[1] || "application/pdf";
      const raw = window.atob(parts[1]);
      const rawLength = raw.length;
      const uInt8Array = new Uint8Array(rawLength);
      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      const blob = new Blob([uInt8Array], { type: contentType });
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = defaultFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (e) {
      console.error("Failed to download base64 PDF:", e);
      // Fallback
      const link = document.createElement("a");
      link.href = pdfFile;
      link.download = defaultFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    return;
  }

  // Fallback to static URL
  const link = document.createElement("a");
  link.href = pdfFile;
  link.download = defaultFileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
