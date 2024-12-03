import React, { useState } from "react";
import { useNotify, useRefresh } from "react-admin";
import Papa from "papaparse";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Define Challenge data structure
interface ChallengeData {
  question: string;
  type: "SELECT" | "ASSIST";
  lessonId: number;
  order: number;
}

const ChallengeCsvImporter = () => {
  const notify = useNotify();
  const refresh = useRefresh();
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    console.log("File selected:", file.name);

    // Parse CSV
    Papa.parse<ChallengeData>(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: async (result) => {
        const { data, errors } = result;
        setLoading(false);

        if (errors.length) {
          console.error("CSV Parsing Errors:", errors);
          notify("CSV contains errors", { type: "warning" });
          return;
        }

        console.log("Parsed Data:", data);

        // Sort data by `order` field (if available)
        const sortedData = [...data].sort((a, b) => a.order - b.order);

        try {
          // Sequentially process each record
          for (const record of sortedData) {
            console.log("Processing record:", record);

            const response = await fetch("/api/challenges", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(record),
            });

            if (!response.ok) {
              throw new Error(`Failed to import challenge: ${response.statusText}`);
            }

            const responseData = await response.json();
            console.log("Response for record:", responseData);
          }

          notify("CSV imported successfully in order", { type: "success" });
          refresh();
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
      <Label htmlFor="csv-upload">Upload Challenge CSV</Label>
      <Input
        id="csv-upload"
        type="file"
        accept=".csv"
        disabled={loading}
        onChange={handleFileUpload}
      />
      {loading && <p>Importing...</p>}
    </div>
  );
};

export default ChallengeCsvImporter;
