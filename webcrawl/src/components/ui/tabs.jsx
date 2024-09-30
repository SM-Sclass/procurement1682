"use client";;
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName
}) => {
  const [active, setActive] = useState(propTabs[0]);
  const [tabs, setTabs] = useState(propTabs);

  const moveSelectedTabToTop = (idx) => {
    const newTabs = [...propTabs];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setTabs(newTabs);
    setActive(newTabs[0]);
  };

  const [hovering, setHovering] = useState(false);

  return (<>
    <div
      className={cn(
        "flex flex-row items-center justify-start [perspective:1000px] relative overflow-auto sm:overflow-visible  max-w-full w-full mb-5",
        containerClassName
      )}>
      {propTabs.map((tab, idx) => (
        <button
          key={tab.title}
          onClick={() => {
            moveSelectedTabToTop(idx);
          }}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          className={cn("relative px-4 py-2 rounded-full", tabClassName)}
          style={{
            transformStyle: "preserve-3d",
          }}>
          {active.value === tab.value && (
            <motion.div
              layoutId="clickedbutton"
              className={cn(
                "absolute inset-0 bg-gray-200 dark:bg-zinc-800 rounded-full ",
                activeTabClassName
              )} />
          )}

          <span className="relative block text-black dark:text-white">
            {tab.title}
          </span>
        </button>
      ))}
    </div>
    <FadeInDiv
      tabs={tabs}
      active={active}
      key={active.value}
      hovering={hovering}
      className={cn("pd-10", contentClassName)} />
  </>);
};

export const FadeInDiv = ({
  className,
  tabs,
  hovering,
  active
}) => {
  const isActive = (tab) => {
    return tab.value === tabs[0].value;
  };
  return (
    (<div className="relative w-full h-full">
      {tabs.map((tab) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          className={cn("w-full h-full absolute top-0 left-0 transition-opacity duration-300", className)}
          style={{
            opacity: tab.value === active.value ? 1 : 0,
            pointerEvents: tab.value === active.value ? 'auto' : 'none',
            transition: 'opacity 0.3s ease-in-out',
          }}
        >
          {tab.content}
        </motion.div>
      ))}
    </div>)
  );
};
