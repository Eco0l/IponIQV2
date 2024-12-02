import React, { useState } from "react";
import { useNotify, useRefresh } from "react-admin";
import Papa from "papaparse";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LessonData {
  id: number;
  title: string;
  unitId: number;
  order: number;
}

const CsvImporter = () => {
  const notify = useNotify();
  const refresh = useRefresh();
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    console.log("File selected:", file.name);

    // Parse CSV
    Papa.parse<LessonData>(file, {
      header: true, // Treat the first row as headers
      dynamicTyping: true, // Automatically convert data types
      skipEmptyLines: true, // Skip empty lines
      complete: async (result) => {
        const { data, errors } = result;
        setLoading(false);

        if (errors.length) {
          // Log all errors in detail
          console.error("CSV Parsing Errors:", errors);
          notify("CSV contains errors", { type: "warning" });
          return;
        }

        console.log("Parsed Data:", data);

        // Check if the parsed data matches the expected structure
        data.forEach((record, index) => {
          console.log(`Row ${index + 1}:`, record);
        });

        try {
          // Send data to the server in bulk
          const responses = await Promise.all(
            data.map(async (record) => {
              // Make POST request to API for each lesson
              const response = await fetch("/api/lessons", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(record),
              });

              if (!response.ok) {
                throw new Error(`Failed to import lesson: ${response.statusText}`);
              }

              return response.json(); // Assuming the response contains the created lesson data
            })
          );

          // Log the responses from the API
          console.log("Import Response:", responses);

          // Success feedback
          notify("CSV imported successfully", { type: "success" });
          refresh(); // Refresh the list view after import
        } catch (error) {
          console.error("Import Error:", error);
          notify("Error importing CSV", { type: "error" });
        }
      },
      error: (error) => {
        setLoading(false);
        console.error("Error parsing CSV:", error);
        notify("Error parsing CSV: " + error.message, { type: "error" });
      },
    });
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="csv-upload">Upload CSV</Label>
      <Input
        id="csv-upload"
        type="file"
        accept=".csv"
        disabled={loading}
        onChange={handleFileUpload}
      />
      {loading && <p>Importing...</p>} {/* Show loading text */}
    </div>
  );
};

export default CsvImporter;
