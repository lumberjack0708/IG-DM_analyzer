import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Button from "../../components/CustomButtons/Button.jsx";

import AnalyzerPageStyle from "../../assets/jss/material-kit-react/views/analyzerPage.jsx";

// Sections for this page
import ProductSection from "./Sections/ProductSection.jsx";
import UploadSection from "./Sections/UploadSection.jsx";
import ResultsSection from "./Sections/ResultsSection.jsx";

//if developing and need sample data so you dont have to upload a file
// set sampleData() as the fileData in the state of this view
// import sampleData from "../../components/SampleData.jsx";

class AnalyzerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileData: null,
      // fileData: sampleData(),
    };
  }

  render() {
    const { classes } = this.props;
    const fileDataSet = () => {
      return this.state.fileData ? true : false;
    };
    const setFileData = (content) => {
      this.setState({ fileData: content });
    };

    return (
      <div>
        <Header
          className={classNames(classes.header)}
          brand="Instagram DM 分析器"
        />
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <ProductSection />
            {!fileDataSet() ? (
              <UploadSection sendToParent={setFileData} />
            ) : (
              <ResultsSection data={this.state.fileData} />
            )}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(AnalyzerPageStyle)(AnalyzerPage);
