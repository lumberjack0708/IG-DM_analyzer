/**
 * 文字解碼工具
 * 用於處理 Instagram JSON 數據中的 Unicode 編碼文字
 */

/**
 * 解碼 Unicode 轉義序列為中文字符
 * @param {string} text - 包含 Unicode 轉義序列的文字
 * @returns {string} - 解碼後的文字
 */
export const decodeUnicodeText = (text) => {
  if (!text || typeof text !== "string") {
    return text;
  }

  try {
    // 處理 \uXXXX 格式的 Unicode 轉義序列（標準格式）
    let decodedText = text.replace(/\\u[\dA-F]{4}/gi, (match) => {
      return String.fromCharCode(parseInt(match.replace(/\\u/g, ""), 16));
    });

    // 處理 \u00XX 格式的 Unicode 轉義序列（用戶提到的格式）
    decodedText = decodedText.replace(/\\u00[\dA-F]{2}/gi, (match) => {
      return String.fromCharCode(parseInt(match.replace(/\\u00/g, ""), 16));
    });

    // 處理可能的 JSON 字符串轉義
    try {
      // 嘗試解析為 JSON 字符串（這會自動處理 Unicode 轉義）
      const jsonDecoded = JSON.parse(
        '"' + decodedText.replace(/"/g, '\\"') + '"',
      );
      return jsonDecoded;
    } catch (e) {
      // 如果 JSON 解析失敗，返回正則表達式處理的結果
      return decodedText;
    }
  } catch (error) {
    console.warn("Unicode 解碼失敗:", error);
    return text;
  }
};

/**
 * 遞歸解碼對象中的所有文字字段
 * @param {any} obj - 需要解碼的對象
 * @returns {any} - 解碼後的對象
 */
export const decodeObjectText = (obj) => {
  if (!obj) return obj;

  if (typeof obj === "string") {
    return decodeUnicodeText(obj);
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => decodeObjectText(item));
  }

  if (typeof obj === "object") {
    const decodedObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        decodedObj[key] = decodeObjectText(obj[key]);
      }
    }
    return decodedObj;
  }

  return obj;
};

/**
 * 專門處理 Instagram 訊息數據的解碼
 * @param {Object} messageData - Instagram 訊息數據
 * @returns {Object} - 解碼後的訊息數據
 */
export const decodeInstagramMessages = (messageData) => {
  if (!messageData) return messageData;

  // 深度克隆對象以避免修改原始數據
  const clonedData = JSON.parse(JSON.stringify(messageData));

  // 遞歸解碼所有文字內容
  return decodeObjectText(clonedData);
};

/**
 * 檢測文字是否包含需要解碼的 Unicode 序列
 * @param {string} text - 要檢測的文字
 * @returns {boolean} - 是否包含需要解碼的序列
 */
export const containsUnicodeEscapes = (text) => {
  if (!text || typeof text !== "string") return false;
  return /\\u[\dA-F]{2,4}/gi.test(text);
};

/**
 * 批量處理對話數據的解碼
 * @param {Array} conversations - 對話數據陣列
 * @returns {Array} - 解碼後的對話數據
 */
export const decodeConversations = (conversations) => {
  if (!Array.isArray(conversations)) return conversations;

  return conversations.map((conversation) => {
    if (conversation.conversation && Array.isArray(conversation.conversation)) {
      return {
        ...conversation,
        conversation: conversation.conversation.map((message) => ({
          ...message,
          text: message.text ? decodeUnicodeText(message.text) : message.text,
          sender: message.sender
            ? decodeUnicodeText(message.sender)
            : message.sender,
        })),
      };
    }
    return conversation;
  });
};
