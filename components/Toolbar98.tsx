// components/Toolbar98.tsx
import { IconChat, IconHelp, IconHotList, IconLibrary, IconSearch, IconTransfer } from "./Icons98";

export default function Toolbar98() {
  return (
    <div className="toolbar-98">
      <button className="win98-btn w-[78px]"><IconChat/><span>Chat</span></button>
      <button className="win98-btn w-[78px]"><IconLibrary/><span>Library</span></button>
      <button className="win98-btn w-[78px] active"><IconSearch/><span>Search</span></button>
      <button className="win98-btn w-[78px]"><IconHotList/><span>Hot List</span></button>
      <button className="win98-btn w-[78px]"><IconTransfer/><span>Transfer</span></button>
      <button className="win98-btn w-[78px]"><IconHelp/><span>Help</span></button>
    </div>
  );
}
