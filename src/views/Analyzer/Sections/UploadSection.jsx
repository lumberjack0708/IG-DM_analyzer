import React from "react";
import ReactFileReader from "react-file-reader";
import Button from "../../../components/CustomButtons/Button.jsx";

// 導入解碼工具
import {
  decodeInstagramMessages,
  containsUnicodeEscapes,
} from "../../../utils/textDecoder.js";

import teamStyle from "../../../assets/jss/material-kit-react/views/landingPageSections/teamStyle.jsx";
import { withStyles } from "@material-ui/core/styles";

class UploadSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sendToParent: this.props.sendToParent,
    };
  }

  render() {
    var fileReader;
    const { classes } = this.props;

    const handleFileUpload = (file) => {
      fileReader = new FileReader();
      fileReader.onloadend = handleFileRead;
      fileReader.readAsText(file);
    };

    const normalizeData = (raw) => {
      // 先檢查是否需要解碼
      const rawString = JSON.stringify(raw);
      let processedData = raw;

      if (containsUnicodeEscapes(rawString)) {
        console.log("檢測到 Unicode 編碼，正在解碼...");
        processedData = decodeInstagramMessages(raw);
        console.log("解碼完成");
      }

      if (Array.isArray(processedData)) {
        return processedData;
      }
      if (
        processedData.conversation &&
        Array.isArray(processedData.conversation)
      ) {
        return [processedData];
      }
      if (processedData.messages && Array.isArray(processedData.messages)) {
        const convo = processedData.messages.map((m) => ({
          created_at: m.timestamp_ms
            ? new Date(m.timestamp_ms).toISOString()
            : m.timestamp || m.created_at,
          sender: m.sender_name || m.sender,
          text: m.text || m.content,
          media: m.media || (m.photos && m.photos[0] && m.photos[0].uri),
        }));
        return [
          {
            participants: processedData.participants || [],
            conversation: convo,
          },
        ];
      }
      return [];
    };

    const handleFileRead = () => {
      let content = {};
      try {
        content = JSON.parse(fileReader.result);
      } catch (e) {
        content = {};
        console.error("檔案解析失敗:", e);
        alert("檔案格式錯誤，請確保上傳正確的 JSON 檔案");
        return;
      }

      const normalizedData = normalizeData(content);

      if (normalizedData.length === 0) {
        alert("無法找到有效的對話數據，請檢查檔案格式");
        return;
      }

      console.log("處理後的數據:", normalizedData);
      this.props.sendToParent(normalizedData);
    };

    return (
      <div className={classes.section} style={{ paddingBottom: "20px" }}>
        <h2 className={classes.title}>上傳您的 JSON 檔案</h2>
        <p style={{ textAlign: "center", color: "#999", marginBottom: "20px" }}>
          請選擇您從 Instagram 下載的 message_1.json 檔案
        </p>
        <ReactFileReader
          fileTypes={[".json"]}
          base64={true}
          multipleFiles={true}
          handleFiles={(e) => handleFileUpload(e.fileList[0])}
        >
          <Button color="info">上傳檔案</Button>
        </ReactFileReader>
      </div>
    );
  }
}

export default withStyles(teamStyle)(UploadSection);
