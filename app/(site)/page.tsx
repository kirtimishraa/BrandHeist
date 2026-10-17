import Hero from "@/components/sections/Hero";
import Flex from "@/components/sections/Flex";
import Arsenal from "@/components/sections/Arsenal";
import Menu from "@/components/sections/Menu";
import GetFreeAudit from "@/components/sections/GetFreeAudit";
import Talk from "@/components/sections/Talk";

export default function Home() {
  return (
    <>
      <Hero />
      <Flex />
      {/* Services before tools: what we do matters more to a buyer than how */}
      <Menu />
      <Arsenal />
      <GetFreeAudit />
      <Talk />
    </>
  );
}
