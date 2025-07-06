import { useCodeEditorStore } from "../store/useCodeEditorStore";
import { Loader2 } from "lucide-react"; // 👈 Import spinner icon

const ComplexityBox = () => {
  const { complexity, isAnalyzing } = useCodeEditorStore();

  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      {/* Time Complexity */}
      <div className="bg-[#1f1f2e] p-6 rounded-xl text-center shadow-md">
        <div className="text-sm text-gray-400">Time Complexity</div>
        {isAnalyzing ? (
          <Loader2 className="w-5 h-5 mx-auto mt-2 text-red-400 animate-spin" />
        ) : (
          <div className="text-2xl font-bold text-red-400">
            {complexity.time || "N/A"}
          </div>
        )}
      </div>

      {/* Space Complexity */}
      <div className="bg-[#1f1f2e] p-6 rounded-xl text-center shadow-md">
        <div className="text-sm text-gray-400">Space Complexity</div>
        {isAnalyzing ? (
          <Loader2 className="w-5 h-5 mx-auto mt-2 text-green-400 animate-spin" />
        ) : (
          <div className="text-2xl font-bold text-green-400">
            {complexity.space || "N/A"}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplexityBox;
