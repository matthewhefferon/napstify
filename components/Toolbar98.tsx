// components/Toolbar98.tsx
import { IconChat, IconHelp, IconHotList, IconLibrary, IconSearch, IconSignin, IconTransfer } from "./Icons98";

export default function Toolbar98() {
  return (
    <div className="toolbar-98">
      <button className="toolbar-btn"><IconChat/><span>Chat</span></button>
      <button className="toolbar-btn"><IconLibrary/><span>Library</span></button>
      <button className="toolbar-btn active"><IconSearch/><span>Search</span></button>
      <button className="toolbar-btn"><IconHotList/><span>Hot List</span></button>
      <button className="toolbar-btn"><IconTransfer/><span>Transfer</span></button>
      <button className="toolbar-btn"><IconHelp/><span>Help</span></button>
      <div className="toolbar-spacer" />
    </div>
  );
}
