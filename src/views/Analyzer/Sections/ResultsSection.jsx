import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
);
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Forum from "@material-ui/icons/Forum";
import Chat from "@material-ui/icons/Chat";
import Textsms from "@material-ui/icons/Textsms";
import PlayCircleFilled from "@material-ui/icons/PlayCircleFilled";

// core components
import GridContainer from "../../../components/Grid/GridContainer.jsx";
import GridItem from "../../../components/Grid/GridItem.jsx";
import InfoArea from "../../../components/InfoArea/InfoArea.jsx";
import Clearfix from "../../../components/Clearfix/Clearfix.jsx";
import Button from "../../../components/CustomButtons/Button.jsx";

// 導入解碼工具
import { decodeUnicodeText } from "../../../utils/textDecoder.js";

import workStyle from "../../../assets/jss/material-kit-react/views/landingPageSections/workStyle.jsx";

class ResultsSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  countConversations = () => {
    const data = Array.isArray(this.props.data) ? this.props.data : [];
    return data.length;
  };

  getUniqueParticipants = () => {
    const data = Array.isArray(this.props.data) ? this.props.data : [];
    let uniqueUsers = [];

    data.map((record) => {
      record.participants.map((user) => {
        if (!uniqueUsers.includes(user)) {
          uniqueUsers.push(decodeUnicodeText(user));
        }
      });
    });

    return uniqueUsers.length;
  };

  countMessages = () => {
    const data = Array.isArray(this.props.data) ? this.props.data : [];
    let msgCount = 0;

    data.map((record) => {
      msgCount += record.conversation.length;
    });

    return msgCount;
  };

  countMsgsByType = (type) => {
    const data = Array.isArray(this.props.data) ? this.props.data : [];
    let msgCount = 0;

    data.map((record) => {
      record.conversation.map((convo) => {
        if (type === "text") {
          if (convo.text) {
            msgCount++;
          }
        } else {
          if (convo.media) {
            msgCount++;
          }
        }
      });
    });

    return msgCount;
  };

  makeMsgTimeData = () => {
    const data = Array.isArray(this.props.data) ? this.props.data : [];
    var chartData = [];
    var labels = [];
    var dataPoints = [];

    for (let i = 0; i < 24; i++) {
      let hour = i;
      let meridian = hour >= 12 ? "下午" : "上午";
      hour = hour % 12;
      hour = hour ? hour : 12; // the hour '0' should be '12'
      chartData.push({
        name: `${meridian} ${hour}:00`,
        count: 0,
      });
    }

    data.map((record) => {
      record.conversation.map((convo) => {
        let createdAt = new Date(convo.created_at);
        let hour = createdAt.getHours();
        chartData[hour].count = chartData[hour].count + 1;
      });
    });

    chartData.map((time) => labels.push(time.name));
    chartData.map((time) => dataPoints.push(time.count));

    return {
      labels: labels,
      datasets: [
        {
          label: "訊息時間分佈",
          backgroundColor: "rgba(89,125,255,0.2)",
          borderColor: "rgba(16,49,168,1)",
          pointBackgroundColor: "rgba(0,0,0,1)",
          data: dataPoints,
        },
      ],
    };
  };

  dailyFrequencyCount = () => {
    const data = Array.isArray(this.props.data) ? this.props.data : [];
    var chartData = [];
    var days = [
      "星期日",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六",
    ];
    var labels = [];
    var dataPoints = [];

    days.map((day) =>
      chartData.push({
        name: day,
        count: 0,
      }),
    );

    data.map((record) => {
      record.conversation.map((convo) => {
        let createdAt = new Date(convo.created_at);
        let day = createdAt.getDay();
        chartData[day].count = chartData[day].count + 1;
      });
    });

    chartData.map((day) => labels.push(day.name));
    chartData.map((day) => dataPoints.push(day.count));

    return {
      labels: labels,
      datasets: [
        {
          label: "星期訊息分佈",
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "rgba(0,0,0,1)",
          data: dataPoints,
        },
      ],
    };
  };

  lineChartOptions = () => {
    return {
      plugins: {
        title: {
          display: true,
          text: "時間分佈圖",
        },
        legend: {
          display: true,
          position: "top",
        },
      },
      scales: {
        y: {
          title: {
            display: true,
            text: "訊息數量",
          },
        },
        x: {
          title: {
            display: true,
            text: "時間",
          },
        },
      },
      responsive: true,
      maintainAspectRatio: true,
    };
  };

  makeSenderQtyData = () => {
    const data = Array.isArray(this.props.data) ? this.props.data : [];
    var senderData = {};

    data.map((record) => {
      record.conversation.map((convo) => {
        let sender = decodeUnicodeText(convo.sender) || "未知用戶";
        senderData[sender] =
          senderData[sender] != undefined ? senderData[sender] + 1 : 1;
      });
    });

    const colors = [
      "#FF6384",
      "#36A2EB",
      "#FFCE56",
      "#4BC0C0",
      "#9966FF",
      "#FF9F40",
      "#FF6384",
      "#C9CBCF",
      "#4BC0C0",
      "#FF6384",
    ];

    const senderNames = Object.keys(senderData);
    const senderCounts = Object.values(senderData);

    console.log("發送者數據:", senderData);
    console.log("發送者名稱:", senderNames);

    return {
      labels: senderNames,
      datasets: [
        {
          data: senderCounts,
          backgroundColor: colors.slice(0, senderNames.length),
          hoverBackgroundColor: colors.slice(0, senderNames.length),
          borderWidth: 2,
          borderColor: "#fff",
        },
      ],
    };
  };

  getMostPopularWords = () => {
    const data = Array.isArray(this.props.data) ? this.props.data : [];
    var wordlist = [];
    var topWrdCount = {};
    var topFiveWords = [];
    var results = [];

    // 英文停用詞列表
    const stopWords = [
      "the",
      "a",
      "an",
      "and",
      "or",
      "but",
      "in",
      "on",
      "at",
      "to",
      "for",
      "of",
      "with",
      "by",
      "is",
      "are",
      "was",
      "were",
      "be",
      "been",
      "have",
      "has",
      "had",
      "do",
      "does",
      "did",
      "will",
      "would",
      "could",
      "should",
      "may",
      "might",
      "must",
      "can",
      "i",
      "you",
      "he",
      "she",
      "it",
      "we",
      "they",
      "me",
      "him",
      "her",
      "us",
      "them",
      "my",
      "your",
      "his",
      "her",
      "its",
      "our",
      "their",
      "this",
      "that",
      "these",
      "those",
    ];

    data.map((record) => {
      record.conversation.map((convo) => {
        if (!convo.text) {
          return;
        }
        let text = decodeUnicodeText(convo.text).toLowerCase();

        // 保留中文字符、英文字母、數字和空格
        text = text.replace(/[^\u4e00-\u9fa5a-zA-Z0-9\s]/g, " ");

        // 分割文字：中文按字符，英文按空格
        let words = [];
        let currentWord = "";

        for (let char of text) {
          if (/[\u4e00-\u9fa5]/.test(char)) {
            // 中文字符，保存當前英文單詞（如果有），然後添加中文字符
            if (currentWord.trim()) {
              words.push(currentWord.trim());
              currentWord = "";
            }
            words.push(char);
          } else if (/[a-zA-Z0-9]/.test(char)) {
            // 英文字符或數字，添加到當前單詞
            currentWord += char;
          } else {
            // 空格或其他字符，保存當前單詞
            if (currentWord.trim()) {
              words.push(currentWord.trim());
              currentWord = "";
            }
          }
        }

        // 添加最後一個單詞（如果有）
        if (currentWord.trim()) {
          words.push(currentWord.trim());
        }

        // 過濾停用詞和短詞
        words = words.filter(
          (word) => word.length > 1 && !stopWords.includes(word.toLowerCase()),
        );

        wordlist = wordlist.concat(words);
      });
    });

    wordlist.map((word) => {
      topWrdCount[word] =
        topWrdCount[word] !== undefined ? topWrdCount[word] + 1 : 1;
    });

    topFiveWords = Object.keys(topWrdCount)
      .sort(function (a, b) {
        return topWrdCount[b] - topWrdCount[a];
      })
      .slice(0, 5);

    results = topFiveWords.map((word) => topWrdCount[word]);

    return {
      labels: topFiveWords,
      datasets: [
        {
          data: results,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
          ],
          borderWidth: 2,
          borderColor: "#fff",
        },
      ],
    };
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>分析結果</h2>
          </GridItem>
        </GridContainer>

        <GridContainer justify="center" style={{ marginBottom: "30px" }}>
          <GridItem xs={12} sm={12} md={8} style={{ textAlign: "center" }}>
            <Button color="primary" onClick={() => window.location.reload()}>
              分析新檔案
            </Button>
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={3} sm={3} md={3}>
            <InfoArea
              title="對話數量"
              description={`您總共有 ${this.countConversations()} 個對話，涉及 ${this.getUniqueParticipants()} 位不同的參與者！`}
              icon={Forum}
              iconColor="info"
            ></InfoArea>
          </GridItem>

          <GridItem xs={3} sm={3} md={3}>
            <InfoArea
              title="訊息總數"
              description={`訊息總數（發送/接收）：${this.countMessages()}`}
              icon={Chat}
              iconColor="info"
            ></InfoArea>
          </GridItem>

          <GridItem xs={3} sm={3} md={3}>
            <InfoArea
              title="文字訊息"
              description={`文字訊息：${this.countMsgsByType("text")}`}
              icon={Textsms}
              iconColor="info"
            ></InfoArea>
          </GridItem>

          <GridItem xs={3} sm={3} md={3}>
            <InfoArea
              title="媒體訊息"
              description={`媒體訊息：${this.countMsgsByType("media")}`}
              icon={PlayCircleFilled}
              iconColor="info"
            ></InfoArea>
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={6} sm={6} md={6}>
            <Line
              data={this.makeMsgTimeData()}
              options={this.lineChartOptions()}
            />
          </GridItem>

          <GridItem xs={6} sm={6} md={6}>
            <Doughnut
              data={this.makeSenderQtyData()}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "各發送者訊息數量",
                    font: {
                      size: 16,
                    },
                  },
                  legend: {
                    display: true,
                    position: "bottom",
                  },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        const label = context.label || "";
                        const value = context.raw || 0;
                        const total = context.dataset.data.reduce(
                          (a, b) => a + b,
                          0,
                        );
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${label}: ${value} 則 (${percentage}%)`;
                      },
                    },
                  },
                },
                maintainAspectRatio: false,
                responsive: true,
              }}
            />
          </GridItem>
        </GridContainer>

        <hr style={{ opacity: 0.3, margin: 10 }} />

        <GridContainer style={{ height: 270 }}>
          <GridItem xs={6} sm={6} md={6}>
            <Doughnut
              data={this.getMostPopularWords()}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "最常使用的詞彙",
                    font: {
                      size: 16,
                    },
                  },
                  legend: {
                    display: true,
                    position: "bottom",
                  },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        const label = context.label || "";
                        const value = context.raw || 0;
                        return `${label}: ${value} 次`;
                      },
                    },
                  },
                },
                maintainAspectRatio: false,
                responsive: true,
              }}
            />
          </GridItem>

          <GridItem xs={6} sm={6} md={6}>
            <Line
              data={this.dailyFrequencyCount()}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "星期分佈圖",
                  },
                  legend: {
                    display: true,
                    position: "top",
                  },
                },
                scales: {
                  y: {
                    title: {
                      display: true,
                      text: "訊息數量",
                    },
                  },
                  x: {
                    title: {
                      display: true,
                      text: "星期",
                    },
                  },
                },
                maintainAspectRatio: true,
              }}
            />
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(workStyle)(ResultsSection);
