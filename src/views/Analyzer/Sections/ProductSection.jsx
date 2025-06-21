import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import MoneyOff from "@material-ui/icons/MoneyOff";
import PieChart from "@material-ui/icons/PieChart";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
// core components
import GridContainer from "../../../components/Grid/GridContainer.jsx";
import GridItem from "../../../components/Grid/GridItem.jsx";
import InfoArea from "../../../components/InfoArea/InfoArea.jsx";

import productStyle from "../../../assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";

class ProductSection extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>分析您的 Instagram 對話</h2>
            <h5 className={classes.description}>
              上傳您的 Instagram 私訊對話 JSON 檔案，我們將為您提供簡單的統計指標和圖表，
              讓您用於數據分析和娛樂！
            </h5>
          </GridItem>
        </GridContainer>
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="完全免費"
                description="您可以完全免費使用此工具，對您來說沒有任何費用！"
                icon={MoneyOff}
                iconColor="info"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="易讀結果"
                description="以易讀且易懂的格式顯示對話分析結果！"
                icon={PieChart}
                iconColor="danger"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="安全可靠"
                description="您的上傳在這裡是安全的。我們不會保留您檔案的副本，只是在您提供給我們時讀取它。重新整理頁面，就像什麼都沒發生過一樣。"
                icon={VerifiedUser}
                iconColor="success"
                vertical
              />
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(productStyle)(ProductSection);
