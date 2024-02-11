import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SolveFile from "./solve-file";
import SolveRInput from "./solve-rinput";
import SolveInput from "./solve-input";
import ResModal from "./res-modal";

const SolveTab = () => {
  return (
    <div className="w-full flex justify-center items-center pt-44">
      <ResModal />
      <Tabs defaultValue="input" className="w-full">
        <TabsList className="w-full flex flex-row">
          <TabsTrigger className="flex-1" value="input">Input</TabsTrigger>
          <TabsTrigger className="flex-1" value="file">File</TabsTrigger>
          <TabsTrigger className="flex-1" value="rinput">Random Input</TabsTrigger>
        </TabsList>
        <TabsContent value="file">
          <SolveFile />
        </TabsContent>
        <TabsContent value="rinput">
          <SolveRInput />
        </TabsContent>
        <TabsContent value="input">
          <SolveInput />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SolveTab;
