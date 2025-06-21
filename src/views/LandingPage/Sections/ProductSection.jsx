import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";

import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";

class ProductSection extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>產品介紹</h2>
            <h5 className={classes.description}>
              這裡是您可以撰寫更多產品詳細資訊的段落。透過提供有意義的資訊來保持用戶的參與度。
              請記住，此時用戶是好奇的，否則他們不會滾動到這裡。如果您希望用戶了解更多，
              可以添加按鈕。
            </h5>
          </GridItem>
        </GridContainer>
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="免費聊天"
                description="將您的產品或機構工作的詳細資訊分成幾個部分。為每個部分寫幾行說明。描述功能的段落就足夠了。"
                icon={Chat}
                iconColor="info"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="認證用戶"
                description="將您的產品或機構工作的詳細資訊分成幾個部分。為每個部分寫幾行說明。描述功能的段落就足夠了。"
                icon={VerifiedUser}
                iconColor="success"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="指紋驗證"
                description="將您的產品或機構工作的詳細資訊分成幾個部分。為每個部分寫幾行說明。描述功能的段落就足夠了。"
                icon={Fingerprint}
                iconColor="danger"
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
