import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import GetApp from "@material-ui/icons/GetApp";
import CloudUpload from "@material-ui/icons/CloudUpload";
import Assessment from "@material-ui/icons/Assessment";

// core components
import GridContainer from "../../../components/Grid/GridContainer.jsx";
import GridItem from "../../../components/Grid/GridItem.jsx";
import InfoArea from "../../../components/InfoArea/InfoArea.jsx";

import productStyle from "../../../assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";

class InstructionSection extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>使用說明</h2>
            <h5 className={classes.description}>
              按照以下步驟獲取並分析您的 Instagram 私訊數據
            </h5>
          </GridItem>
        </GridContainer>
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="1. 下載數據"
                description="前往 Instagram 設定 > 隱私與安全 > 下載資料，申請下載您的完整數據副本。通常需要 1-2 天處理時間。"
                icon={GetApp}
                iconColor="info"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="2. 上傳檔案"
                description="解壓下載的檔案，找到 messages > inbox 資料夾中的 message_1.json 檔案，然後上傳到此工具。"
                icon={CloudUpload}
                iconColor="success"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="3. 查看分析"
                description="上傳完成後，您將看到詳細的分析結果，包括對話統計、時間分佈圖表和最常用詞彙等資訊。"
                icon={Assessment}
                iconColor="danger"
                vertical
              />
            </GridItem>
          </GridContainer>
        </div>

        <GridContainer justify="center" style={{ marginTop: "40px" }}>
          <GridItem xs={12} sm={12} md={8}>
            <div
              style={{
                backgroundColor: "#f8f9fa",
                padding: "20px",
                borderRadius: "8px",
                border: "1px solid #dee2e6",
              }}
            >
              <h4 style={{ color: "#495057", marginBottom: "15px" }}>
                📋 重要提醒
              </h4>
              <ul style={{ color: "#6c757d", lineHeight: "1.6" }}>
                <li>
                  此工具完全在您的瀏覽器中運行，不會將您的數據上傳到任何伺服器
                </li>
                <li>支持自動檢測和解碼 Unicode 編碼的中文字符</li>
                <li>
                  建議使用最新版本的 Chrome 或 Firefox 瀏覽器以獲得最佳體驗
                </li>
                <li>如果檔案較大（超過 50MB），載入可能需要一些時間</li>
                <li>重新整理頁面將清除所有已載入的數據</li>
              </ul>
            </div>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(productStyle)(InstructionSection);
