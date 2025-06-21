import React from "react";
import ReactFileReader from "react-file-reader";
import Button from "../../../components/CustomButtons/Button.jsx";

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

    const handleFileUpload = file => {
      fileReader = new FileReader();
      fileReader.onloadend = handleFileRead;
      fileReader.readAsText(file);
    };

    const normalizeData = raw => {
      if (Array.isArray(raw)) {
        return raw;
      }
      if (raw.conversation && Array.isArray(raw.conversation)) {
        return [raw];
      }
      if (raw.messages && Array.isArray(raw.messages)) {
        const convo = raw.messages.map(m => ({
          created_at: m.timestamp_ms
            ? new Date(m.timestamp_ms).toISOString()
            : m.timestamp || m.created_at,
          sender: m.sender_name || m.sender,
          text: m.text || m.content,
          media: m.media || (m.photos && m.photos[0] && m.photos[0].uri)
        }));
        return [
          {
            participants: raw.participants || [],
            conversation: convo
          }
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
      }
      this.props.sendToParent(normalizeData(content));
    };

    return (
      <div className={classes.section} style={{paddingBottom: "20px"}}>
        <h2 className={classes.title}>Upload your JSON File Here</h2>
        <ReactFileReader
          fileTypes={[".json"]}
          base64={true}
          multipleFiles={true}
          handleFiles={e => handleFileUpload(e.fileList[0])}
        >
          <Button color="info">Upload</Button>
        </ReactFileReader>
      </div>
    );
  }
}

export default withStyles(teamStyle)(UploadSection);
