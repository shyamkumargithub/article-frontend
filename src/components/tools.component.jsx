import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import Image from "@editorjs/image";
import Raw from "@editorjs/raw";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import SimpleImage from "@editorjs/simple-image";

export const tools = {
  embed: Embed,
  table: Table,
  warning: Warning,
  code: Code,
  linkTool: LinkTool,
  raw: Raw,
  checklist: CheckList,
  delimiter: Delimiter,
  list: {
    class: List,
    inlineToolbar: true,
  },
  image: Image,
  header: {
    class: Header,
    config: {
      placeholder: "Type heading...",
      levels: [2, 3, 4, 5],
      defaultLevel: 2,
    },
  },
  Quote: Quote,
  marker: Marker,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
};
