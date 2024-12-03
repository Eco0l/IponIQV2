import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  value?: number | string; // Make value optional
  variant: "points" | "hearts" | "title"; // 'title' variant
  title?: string; // Optional title prop to pass user title
};


export const ResultCard = ({ value, variant, title }: Props) => {
  // Select the icon based on the variant
  const imageSrc = variant === "hearts" ? "/hearts.svg" : variant === "points" ? "/points.svg" : "/arrow-up.svg"; 

  return (
    <div
      className={cn(
        "rounded-2xl border-2 w-full",
        variant === "points" && "bg-orange-400 border-orange-400",
        variant === "hearts" && "bg-rose-500 border-rose-500",
        variant === "title" && "bg-green-500 border-green-600" // Green background for title card
      )}
    >
      <div
        className={cn(
          "p-1.5 text-white rounded-t-xl font-bold text-center uppercase text-xs",
          variant === "hearts" && "bg-rose-500",
          variant === "points" && "bg-orange-400",
          variant === "title" && "bg-green-600" // Green background style for title
        )}
      >
        {variant === "hearts" && "Hearts Left"}
        {variant === "points" && "Total XP"}
        {variant === "title" && "User Title"} {/* Label for the title */}
      </div>
      <div
        className={cn(
          "rounded-2xl bg-white items-center flex justify-center p-6 font-bold text-lg",
          variant === "hearts" && "text-rose-500",
          variant === "points" && "text-orange-400",
          variant === "title" && "text-green-700" // Green text color for title
        )}
      >
        <Image
          alt="Icon"
          src={imageSrc}
          height={30}
          width={30}
          className="mr-1.5"
        />
        {variant === "title" ? title : value} {/* Display title or value */}
      </div>
      {/* Display the user's title with an upward arrow */}
      {title && variant === "title" && (
        <div className="flex items-center text-sm text-neutral-700 mt-2">
          
        </div>
      )}
    </div>
  );
};
