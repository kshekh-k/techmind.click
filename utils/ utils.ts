/**
 * Formats a number of bytes into a human-readable string
 * @param bytes - The file size in bytes
 * @param decimals - Number of decimal places to show (default: 2)
 * @returns Formatted string with appropriate unit (e.g., "1.23 MB")
 */
export const formatFileSize = (bytes: number, decimals: number = 2): string => {
  if (!Number.isFinite(bytes)) {
    throw new Error('Input must be a finite number');
  }

  if (bytes < 0) {
    throw new Error('File size cannot be negative');
  }

  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const unitIndex = Math.floor(Math.log(bytes) / Math.log(k));

  // Handle cases where the unitIndex might be out of bounds
  const safeUnitIndex = Math.min(unitIndex, units.length - 1);
  const unit = units[safeUnitIndex];

  // Format the number with specified decimal places
  const formattedSize = parseFloat((bytes / Math.pow(k, safeUnitIndex)).toFixed(decimals));

  return `${formattedSize} ${unit}`;
};

// Optional: Add a convenience function for common use cases
export const formatFileSizeKB = (bytes: number) => formatFileSize(bytes, 0);
export const formatFileSizePrecise = (bytes: number) => formatFileSize(bytes, 3);