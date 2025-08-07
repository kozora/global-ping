import { DurableObject } from 'cloudflare:workers'

export interface Env {
  WEBSITE_CHECKER: DurableObjectNamespace<WebsiteChecker>
}

// Cloudflare 数据中心代码映射表
const CF_COLO_LOCATIONS: Record<string, string> = {
  // 北美洲
  'EWR': '美国 纽约/纽瓦克',
  'IAD': '美国 弗吉尼亚/阿什本',
  'ATL': '美国 亚特兰大',
  'BOS': '美国 波士顿',
  'ORD': '美国 芝加哥',
  'DFW': '美国 达拉斯',
  'DEN': '美国 丹佛',
  'IAH': '美国 休斯顿',
  'LAX': '美国 洛杉矶',
  'MCI': '美国 堪萨斯城',
  'MIA': '美国 迈阿密',
  'MSP': '美国 明尼阿波利斯',
  'LGA': '美国 纽约',
  'PHL': '美国 费城',
  'PHX': '美国 凤凰城',
  'PDX': '美国 波特兰',
  'SJC': '美国 圣何塞',
  'SEA': '美国 西雅图',
  'SLC': '美国 盐湖城',
  'YUL': '加拿大 蒙特利尔',
  'YYZ': '加拿大 多伦多',
  'YVR': '加拿大 温哥华',
  'MEX': '墨西哥 墨西哥城',

  // 欧洲
  'AMS': '荷兰 阿姆斯特丹',
  'ATH': '希腊 雅典',
  'BCN': '西班牙 巴塞罗那',
  'BRU': '比利时 布鲁塞尔',
  'BEG': '塞尔维亚 贝尔格莱德',
  'TXL': '德国 柏林',
  'OTP': '罗马尼亚 布加勒斯特',
  'BUD': '匈牙利 布达佩斯',
  'CPH': '丹麦 哥本哈根',
  'DUB': '爱尔兰 都柏林',
  'DUS': '德国 杜塞尔多夫',
  'FRA': '德国 法兰克福',
  'HAM': '德国 汉堡',
  'HEL': '芬兰 赫尔辛基',
  'IST': '土耳其 伊斯坦布尔',
  'KBP': '乌克兰 基辅',
  'LIS': '葡萄牙 里斯本',
  'LHR': '英国 伦敦',
  'MAD': '西班牙 马德里',
  'MAN': '英国 曼彻斯特',
  'MRS': '法国 马赛',
  'MXP': '意大利 米兰',
  'DME': '俄罗斯 莫斯科',
  'MUC': '德国 慕尼黑',
  'OSL': '挪威 奥斯陆',
  'CDG': '法国 巴黎',
  'PRG': '捷克 布拉格',
  'KEF': '冰岛 雷克雅未克',
  'RIX': '拉脱维亚 里加',
  'FCO': '意大利 罗马',
  'LED': '俄罗斯 圣彼得堡',
  'SOF': '保加利亚 索非亚',
  'ARN': '瑞典 斯德哥尔摩',
  'TLL': '爱沙尼亚 塔林',
  'VIE': '奥地利 维也纳',
  'WAW': '波兰 华沙',
  'ZRH': '瑞士 苏黎世',

  // 亚洲
  'BLR': '印度 班加罗尔',
  'BKK': '泰国 曼谷',
  'BWN': '文莱 斯里巴加湾市',
  'CEB': '菲律宾 宿务',
  'CTU': '中国 成都',
  'MAA': '印度 钦奈',
  'CMB': '斯里兰卡 科伦坡',
  'DAC': '孟加拉国 达卡',
  'DEL': '印度 德里',
  'DMM': '沙特阿拉伯 达曼',
  'DOH': '卡塔尔 多哈',
  'DXB': '阿联酋 迪拜',
  'FUO': '中国 佛山',
  'FOC': '中国 福州',
  'CAN': '中国 广州',
  'HGH': '中国 杭州',
  'HAN': '越南 河内',
  'HKG': '中国 香港',
  'HYD': '印度 海得拉巴',
  'CGK': '印度尼西亚 雅加达',
  'JED': '沙特阿拉伯 吉达',
  'KUL': '马来西亚 吉隆坡',
  'KHI': '巴基斯坦 卡拉奇',
  'KTM': '尼泊尔 加德满都',
  'CCU': '印度 加尔各答',
  'KWI': '科威特 科威特城',
  'LHE': '巴基斯坦 拉合尔',
  'MFM': '中国 澳门',
  'MLE': '马尔代夫 马累',
  'MNL': '菲律宾 马尼拉',
  'BOM': '印度 孟买',
  'MCT': '阿曼 马斯喀特',
  'KIX': '日本 大阪',
  'PNH': '柬埔寨 金边',
  'ICN': '韩国 首尔',
  'SHA': '中国 上海',
  'SIN': '新加坡',
  'SZX': '中国 深圳',
  'TPE': '中国 台北',
  'PVG': '中国 上海浦东',
  'NRT': '日本 东京',
  'RUH': '沙特阿拉伯 利雅得',

  // 大洋洲
  'AKL': '新西兰 奥克兰',
  'BNE': '澳大利亚 布里斯班',
  'MEL': '澳大利亚 墨尔本',
  'PER': '澳大利亚 珀斯',
  'SYD': '澳大利亚 悉尼',

  // 南美洲
  'EZE': '阿根廷 布宜诺斯艾利斯',
  'BOG': '哥伦比亚 波哥大',
  'GRU': '巴西 圣保罗',
  'LIM': '秘鲁 利马',
  'MDE': '哥伦比亚 麦德林',
  'PTY': '巴拿马 巴拿马城',
  'SCL': '智利 圣地亚哥',
  'UIO': '厄瓜多尔 基多',

  // 非洲
  'CAI': '埃及 开罗',
  'CPT': '南非 开普敦',
  'DAR': '坦桑尼亚 达累斯萨拉姆',
  'JIB': '吉布提',
  'JNB': '南非 约翰内斯堡',
  'LOS': '尼日利亚 拉各斯',
  'MBA': '肯尼亚 蒙巴萨',
  'NBO': '肯尼亚 内罗毕'
}

// 支持的检测位置
const SUPPORTED_LOCATIONS = [
  { code: 'wnam' as const, name: '北美西部' },
  { code: 'enam' as const, name: '北美东部' },
  { code: 'sam' as const, name: '南美洲' },
  { code: 'weur' as const, name: '欧洲西部' },
  { code: 'eeur' as const, name: '欧洲东部' },
  { code: 'apac' as const, name: '亚太地区' },
  { code: 'oc' as const, name: '大洋洲' },
  { code: 'afr' as const, name: '非洲' },
  { code: 'me' as const, name: '中东' }
]

// 定义位置代码类型
type LocationCode = typeof SUPPORTED_LOCATIONS[number]['code']

interface CheckResult {
  url: string
  status: number | null
  statusText: string
  responseTime: number
  success: boolean
  error?: string
  timestamp: string
  location: string
  locationCode: string
  locationName: string
  locationInfo?: string
}

function getHomePage(): string {
  return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>全球多地区网站检测工具</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary-gradient: linear-gradient(135deg, #4776E6 0%, #8E54E9 100%);
            --secondary-gradient: linear-gradient(135deg, #00c6ff 0%, #0072ff 100%);
            --success-gradient: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
            --error-gradient: linear-gradient(135deg, #f5576c 0%, #f093fb 100%);
            --card-bg: rgba(30, 30, 46, 0.7);
            --card-border: rgba(81, 81, 120, 0.3);
            --text-primary: rgba(255, 255, 255, 0.95);
            --text-secondary: rgba(255, 255, 255, 0.7);
            --text-tertiary: rgba(255, 255, 255, 0.5);
            --glow-blue: 0 0 15px rgba(71, 118, 230, 0.5);
            --glow-purple: 0 0 15px rgba(142, 84, 233, 0.5);
            --noise-opacity: 0.03;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        @keyframes gradientAnimation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.8; }
            100% { transform: scale(1); opacity: 1; }
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
        }

        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        body {
            font-family: 'Inter', sans-serif;
            background-color: #0f0f1a;
            color: var(--text-primary);
            min-height: 100vh;
            position: relative;
            overflow-x: hidden;
        }

        body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
            opacity: var(--noise-opacity);
            z-index: -1;
            pointer-events: none;
        }

        .background-gradient {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at 50% 50%, rgba(71, 118, 230, 0.1) 0%, rgba(142, 84, 233, 0.1) 25%, rgba(10, 10, 20, 0) 50%);
            z-index: -1;
            animation: pulse 15s infinite ease-in-out;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px 20px;
            position: relative;
            z-index: 1;
        }

        .header {
            text-align: center;
            margin-bottom: 40px;
            position: relative;
        }

        .header h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 10px;
            background: var(--primary-gradient);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            position: relative;
            display: inline-block;
        }

        .header h1::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 50%;
            transform: translateX(-50%);
            width: 100px;
            height: 3px;
            background: var(--primary-gradient);
            border-radius: 3px;
        }

        .header p {
            color: var(--text-secondary);
            font-size: 1.1rem;
            max-width: 600px;
            margin: 20px auto;
        }

        .input-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 30px;
            position: relative;
        }

        .url-input-wrapper {
            position: relative;
            width: 100%;
            max-width: 600px;
            margin-bottom: 20px;
        }

        .url-input {
            width: 100%;
            padding: 15px 20px;
            border-radius: 12px;
            border: 1px solid var(--card-border);
            background: rgba(30, 30, 46, 0.5);
            color: var(--text-primary);
            font-size: 1rem;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }

        .url-input:focus {
            outline: none;
            border-color: rgba(71, 118, 230, 0.5);
            box-shadow: 0 0 0 3px rgba(71, 118, 230, 0.25);
        }

        .url-input::placeholder {
            color: var(--text-tertiary);
        }

        .region-selector {
            width: 100%;
            max-width: 600px;
            margin-bottom: 20px;
            position: relative;
        }

        .region-selector-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }

        .region-selector-header h3 {
            font-size: 1rem;
            font-weight: 500;
            color: var(--text-secondary);
        }

        .region-selector-toggle {
            display: flex;
            align-items: center;
            cursor: pointer;
        }

        .region-selector-toggle span {
            margin-right: 5px;
            font-size: 0.9rem;
            color: var(--text-tertiary);
        }

        .region-options {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: 10px;
            padding: 15px;
            border-radius: 12px;
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            backdrop-filter: blur(10px);
            margin-bottom: 20px;
            animation: fadeIn 0.3s ease-out;
        }

        .region-option {
            display: flex;
            align-items: center;
            padding: 8px 12px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s ease;
            border: 1px solid transparent;
        }

        .region-option:hover {
            background: rgba(255, 255, 255, 0.05);
        }

        .region-option.selected {
            border-color: rgba(71, 118, 230, 0.5);
            background: rgba(71, 118, 230, 0.1);
        }

        .region-option input {
            margin-right: 8px;
        }

        .region-option label {
            font-size: 0.9rem;
            color: var(--text-secondary);
            cursor: pointer;
        }

        .button {
            padding: 12px 30px;
            border-radius: 12px;
            border: none;
            background: var(--primary-gradient);
            color: white;
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            box-shadow: var(--glow-blue);
        }

        .button:hover {
            transform: translateY(-2px);
            box-shadow: var(--glow-purple);
        }

        .button:active {
            transform: translateY(1px);
        }

        .button:disabled {
            background: linear-gradient(135deg, #4776E6 0%, #8E54E9 100%);
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
        }

        .button::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: var(--primary-gradient);
            z-index: -1;
            border-radius: 14px;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .button:hover::before {
            opacity: 1;
        }

        .button-content {
            position: relative;
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .loader {
            display: inline-block;
            width: 20px;
            height: 20px;
            margin-right: 10px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 1s linear infinite;
        }

        .result-container {
            margin-top: 40px;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.5s ease;
        }

        .result-container.visible {
            opacity: 1;
            transform: translateY(0);
        }

        .result-header {
            text-align: center;
            margin-bottom: 30px;
        }

        .result-header h2 {
            font-size: 1.8rem;
            margin-bottom: 10px;
            color: var(--text-primary);
        }

        .result-header p {
            color: var(--text-tertiary);
            font-size: 0.9rem;
        }

        .summary-container {
            background: var(--card-bg);
            border-radius: 16px;
            border: 1px solid var(--card-border);
            padding: 25px;
            margin-bottom: 30px;
            backdrop-filter: blur(10px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            position: relative;
            overflow: hidden;
        }

        .summary-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: var(--primary-gradient);
            background-size: 200% 200%;
            animation: gradientAnimation 3s ease infinite;
        }

        .summary-title {
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 20px;
            color: var(--text-primary);
            display: flex;
            align-items: center;
        }

        .summary-title svg {
            margin-right: 10px;
            width: 20px;
            height: 20px;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
        }

        .stat-card {
            background: rgba(20, 20, 35, 0.5);
            border-radius: 12px;
            padding: 20px;
            text-align: center;
            position: relative;
            overflow: hidden;
            transition: transform 0.3s ease;
        }

        .stat-card:hover {
            transform: translateY(-5px);
        }

        .stat-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
        }

        .stat-success-rate::before {
            background: var(--success-gradient);
        }

        .stat-avg-time::before {
            background: var(--secondary-gradient);
        }

        .stat-fastest::before {
            background: var(--success-gradient);
        }

        .stat-slowest::before {
            background: var(--error-gradient);
        }

        .stat-label {
            font-size: 0.9rem;
            color: var(--text-tertiary);
            margin-bottom: 10px;
        }

        .stat-value {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 5px;
            background: var(--primary-gradient);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .stat-subtext {
            font-size: 0.8rem;
            color: var(--text-tertiary);
        }

        .regions-container {
            margin-top: 30px;
        }

        .regions-title {
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 20px;
            color: var(--text-primary);
            display: flex;
            align-items: center;
        }

        .regions-title svg {
            margin-right: 10px;
            width: 20px;
            height: 20px;
        }

        .region-cards {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 20px;
        }

        .region-card {
            background: var(--card-bg);
            border-radius: 12px;
            border: 1px solid var(--card-border);
            padding: 20px;
            position: relative;
            overflow: hidden;
            backdrop-filter: blur(5px);
            transition: all 0.3s ease;
            animation: fadeIn 0.5s ease-out;
            animation-fill-mode: both;
        }

        .region-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .region-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 3px;
            height: 100%;
        }

        .region-success::before {
            background: var(--success-gradient);
        }

        .region-error::before {
            background: var(--error-gradient);
        }

        .region-name {
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 15px;
            color: var(--text-primary);
        }

        .region-detail {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
        }

        .region-detail-label {
            font-size: 0.85rem;
            color: var(--text-tertiary);
            width: 80px;
            flex-shrink: 0;
        }

        .region-detail-value {
            font-size: 0.9rem;
            color: var(--text-secondary);
        }

        .status-badge {
            display: inline-block;
            padding: 3px 8px;
            border-radius: 12px;
            font-size: 0.8rem;
            font-weight: 500;
        }

        .status-success {
            background: rgba(67, 233, 123, 0.15);
            color: #43e97b;
        }

        .status-error {
            background: rgba(245, 87, 108, 0.15);
            color: #f5576c;
        }

        .loading-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40px;
            background: var(--card-bg);
            border-radius: 16px;
            border: 1px solid var(--card-border);
            backdrop-filter: blur(10px);
        }

        .loading-spinner {
            width: 50px;
            height: 50px;
            border: 4px solid rgba(71, 118, 230, 0.1);
            border-radius: 50%;
            border-top: 4px solid #4776E6;
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
        }

        .loading-text {
            font-size: 1.2rem;
            color: var(--text-primary);
            margin-bottom: 10px;
        }

        .loading-subtext {
            color: var(--text-tertiary);
            text-align: center;
        }

        .error-container {
            padding: 30px;
            background: var(--card-bg);
            border-radius: 16px;
            border: 1px solid var(--card-border);
            text-align: center;
            backdrop-filter: blur(10px);
        }

        .error-icon {
            font-size: 3rem;
            color: #f5576c;
            margin-bottom: 20px;
        }

        .error-title {
            font-size: 1.5rem;
            color: var(--text-primary);
            margin-bottom: 10px;
        }

        .error-message {
            color: var(--text-secondary);
        }

        .hidden {
            display: none;
        }

        @media (max-width: 768px) {
            .header h1 {
                font-size: 2rem;
            }
            
            .stats-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .region-cards {
                grid-template-columns: 1fr;
            }
        }

        @media (max-width: 480px) {
            .header h1 {
                font-size: 1.8rem;
            }
            
            .stats-grid {
                grid-template-columns: 1fr;
            }
            
            .button {
                width: 100%;
            }
        }

        /* 动画延迟，使卡片逐个显示 */
        .region-card:nth-child(1) { animation-delay: 0.1s; }
        .region-card:nth-child(2) { animation-delay: 0.2s; }
        .region-card:nth-child(3) { animation-delay: 0.3s; }
        .region-card:nth-child(4) { animation-delay: 0.4s; }
        .region-card:nth-child(5) { animation-delay: 0.5s; }
        .region-card:nth-child(6) { animation-delay: 0.6s; }
        .region-card:nth-child(7) { animation-delay: 0.7s; }
        .region-card:nth-child(8) { animation-delay: 0.8s; }
        .region-card:nth-child(9) { animation-delay: 0.9s; }
    </style>
</head>
<body>
    <div class="background-gradient"></div>
    <div class="container">
        <div class="header">
            <h1>全球多地区网站检测工具</h1>
            <p>通过 Cloudflare 全球边缘网络，从多个地区同时检测您的网站可用性</p>
            <p>由于目前 Cloudflare 的限制，所以检测结果的地区和实际数据中心的位置可能不匹配，以数据中心位置为准</p>
        </div>
        
        <div class="input-container">
            <div class="url-input-wrapper">
                <input type="url" id="urlInput" class="url-input" placeholder="https://example.com" />
            </div>
            
            <div class="region-selector">
                <div class="region-selector-header">
                    <h3>选择检测地区</h3>
                    <div class="region-selector-toggle" id="regionToggle">
                        <span id="regionToggleText">全选</span>
                    </div>
                </div>
                <div class="region-options" id="regionOptions">
                    <!-- 地区选项将通过 JavaScript 动态生成 -->
                </div>
            </div>
            
            <button id="checkButton" class="button" onclick="checkWebsite()">
                <div class="button-content">
                    <span>开始检测</span>
                </div>
            </button>
        </div>
        
        <div id="loadingContainer" class="loading-container hidden">
            <div class="loading-spinner"></div>
            <div class="loading-text">正在从全球多个地区检测中...</div>
            <div class="loading-subtext">这可能需要几秒钟时间，请耐心等待</div>
        </div>
        
        <div id="errorContainer" class="error-container hidden">
            <div class="error-icon">⚠️</div>
            <div class="error-title">检测失败</div>
            <div class="error-message" id="errorMessage"></div>
        </div>
        
        <div id="resultContainer" class="result-container">
            <!-- 结果将通过 JavaScript 动态生成 -->
        </div>
    </div>

    <script>
        // 支持的检测位置
        const SUPPORTED_LOCATIONS = [
            { code: 'wnam', name: '北美西部' },
            { code: 'enam', name: '北美东部' },
            { code: 'sam', name: '南美洲' },
            { code: 'weur', name: '欧洲西部' },
            { code: 'eeur', name: '欧洲东部' },
            { code: 'apac', name: '亚太地区' },
            { code: 'oc', name: '大洋洲' },
            { code: 'afr', name: '非洲' },
            { code: 'me', name: '中东' }
        ];
        
        // 初始化页面
        document.addEventListener('DOMContentLoaded', function() {
            initRegionSelector();
            
            // 支持回车键提交
            document.getElementById('urlInput').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    checkWebsite();
                }
            });
        });
        
        // 初始化地区选择器
        function initRegionSelector() {
            const regionOptions = document.getElementById('regionOptions');
            const regionToggle = document.getElementById('regionToggle');
            const regionToggleText = document.getElementById('regionToggleText');
            
            // 清空现有选项
            regionOptions.innerHTML = '';
            
            // 创建地区选项
            SUPPORTED_LOCATIONS.forEach(location => {
                const option = document.createElement('div');
                option.className = 'region-option selected';
                
                const input = document.createElement('input');
                input.type = 'checkbox';
                input.id = location.code;
                input.value = location.code;
                input.checked = true;
                
                const label = document.createElement('label');
                label.htmlFor = location.code;
                label.textContent = location.name;
                
                option.appendChild(input);
                option.appendChild(label);
                regionOptions.appendChild(option);
                
                // 添加点击事件
                option.addEventListener('click', function(e) {
                    const checkbox = this.querySelector('input');
                    if (e.target !== checkbox) { // 如果点击的不是checkbox本身
                        checkbox.checked = !checkbox.checked;
                        this.classList.toggle('selected', checkbox.checked);
                        updateToggleText();
                    }
                });
                
                // 为checkbox添加change事件
                input.addEventListener('change', function() {
                    this.parentElement.classList.toggle('selected', this.checked);
                    updateToggleText();
                });
            });
            
            // 全选/取消全选
            regionToggle.addEventListener('click', function() {
                const checkboxes = regionOptions.querySelectorAll('input[type="checkbox"]');
                const allChecked = Array.from(checkboxes).every(cb => cb.checked);
                
                checkboxes.forEach(cb => {
                    cb.checked = !allChecked;
                    cb.parentElement.classList.toggle('selected', !allChecked);
                });
                
                updateToggleText();
            });
            
            // 更新切换按钮文本
            function updateToggleText() {
                const checkboxes = regionOptions.querySelectorAll('input[type="checkbox"]');
                const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
                
                if (checkedCount === 0) {
                    regionToggleText.textContent = '全选';
                } else if (checkedCount === checkboxes.length) {
                    regionToggleText.textContent = '取消全选';
                } else {
                    regionToggleText.textContent = '全选';
                }
            }
            
            // 初始化时更新一次切换按钮文本
            updateToggleText();
        }
        
        // 获取选中的地区
        function getSelectedRegions() {
            const checkboxes = document.querySelectorAll('#regionOptions input[type="checkbox"]:checked');
            return Array.from(checkboxes).map(cb => cb.value);
        }
        
        // 检测网站
        async function checkWebsite() {
            const url = document.getElementById('urlInput').value;
            const checkButton = document.getElementById('checkButton');
            const loadingContainer = document.getElementById('loadingContainer');
            const errorContainer = document.getElementById('errorContainer');
            const resultContainer = document.getElementById('resultContainer');
            
            if (!url) {
                showError('请输入有效的网站URL');
                return;
            }
            
            // 获取选中的地区
            const selectedRegions = getSelectedRegions();
            
            if (selectedRegions.length === 0) {
                showError('请至少选择一个检测地区');
                return;
            }
            
            // 显示加载状态
            checkButton.disabled = true;
            checkButton.innerHTML = '<div class="button-content"><div class="loader"></div><span>检测中...</span></div>';
            loadingContainer.classList.remove('hidden');
            errorContainer.classList.add('hidden');
            resultContainer.innerHTML = '';
            resultContainer.classList.remove('visible');
            
            try {
                const response = await fetch('/api/check', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        targetUrl: url,
                        selectedRegions: selectedRegions
                    })
                });
                
                const data = await response.json();
                
                if (data.error) {
                    showError(data.error);
                    return;
                }
                
                if (data.results && Array.isArray(data.results)) {
                    renderResults(data);
                } else {
                    showError('返回数据格式错误');
                }
            } catch (error) {
                showError('请求失败: ' + error.message);
            } finally {
                // 恢复按钮状态
                checkButton.disabled = false;
                checkButton.innerHTML = '<div class="button-content"><span>开始检测</span></div>';
                loadingContainer.classList.add('hidden');
            }
        }
        
        // 显示错误信息
        function showError(message) {
            const errorContainer = document.getElementById('errorContainer');
            const errorMessage = document.getElementById('errorMessage');
            const loadingContainer = document.getElementById('loadingContainer');
            
            errorMessage.textContent = message;
            errorContainer.classList.remove('hidden');
            loadingContainer.classList.add('hidden');
        }
        
        // 渲染检测结果
        function renderResults(data) {
            const resultContainer = document.getElementById('resultContainer');
            
            // 计算统计数据
            const successCount = data.results.filter(r => r.success).length;
            const totalCount = data.results.length;
            const successRate = Math.round((successCount / totalCount) * 100);
            
            const responseTimes = data.results.map(r => r.responseTime).filter(t => t > 0);
            const avgTime = responseTimes.length > 0 
                ? Math.round(responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length) 
                : 0;
            
            const fastestTime = responseTimes.length > 0 ? Math.min(...responseTimes) : 0;
            const slowestTime = responseTimes.length > 0 ? Math.max(...responseTimes) : 0;
            
            const fastestRegion = fastestTime > 0 
                ? data.results.find(r => r.responseTime === fastestTime)?.locationName 
                : 'N/A';
            
            const slowestRegion = slowestTime > 0 
                ? data.results.find(r => r.responseTime === slowestTime)?.locationName 
                : 'N/A';
            
            // 构建结果HTML
            let resultHTML = \`
                <div class="result-header">
                    <h2>\${data.url}</h2>
                    <p>检测时间: \${new Date(data.timestamp).toLocaleString()}</p>
                </div>
                
                <div class="summary-container">
                    <div class="summary-title">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 20h9"></path>
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                        </svg>
                        总体情况
                    </div>
                    <div class="stats-grid">
                        <div class="stat-card stat-success-rate">
                            <div class="stat-label">成功率</div>
                            <div class="stat-value">\${successRate}%</div>
                            <div class="stat-subtext">\${successCount}/\${totalCount} 个地区</div>
                        </div>
                        <div class="stat-card stat-avg-time">
                            <div class="stat-label">平均响应时间</div>
                            <div class="stat-value">\${avgTime}</div>
                            <div class="stat-subtext">毫秒</div>
                        </div>
                        <div class="stat-card stat-fastest">
                            <div class="stat-label">最快地区</div>
                            <div class="stat-value">\${fastestTime}</div>
                            <div class="stat-subtext">\${fastestRegion}</div>
                        </div>
                        <div class="stat-card stat-slowest">
                            <div class="stat-label">最慢地区</div>
                            <div class="stat-value">\${slowestTime}</div>
                            <div class="stat-subtext">\${slowestRegion}</div>
                        </div>
                    </div>
                </div>
                
                <div class="regions-container">
                    <div class="regions-title">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="2" y1="12" x2="22" y2="12"></line>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                        </svg>
                        各地区检测结果
                    </div>
                    <div class="region-cards">
            \`;
            
            // 添加每个地区的结果卡片
            data.results.forEach(result => {
                const statusClass = result.success ? 'status-success' : 'status-error';
                const statusText = result.success ? '成功' : '失败';
                const regionClass = result.success ? 'region-success' : 'region-error';
                
                resultHTML += \`
                    <div class="region-card \${regionClass}">
                        <div class="region-name">\${result.locationName}</div>
                        <div class="region-detail">
                            <div class="region-detail-label">状态</div>
                            <div class="region-detail-value">
                                <span class="status-badge \${statusClass}">\${statusText}</span>
                                \${result.status ? result.status : ''} \${result.statusText}
                            </div>
                        </div>
                        <div class="region-detail">
                            <div class="region-detail-label">响应时间</div>
                            <div class="region-detail-value">\${result.responseTime}ms</div>
                        </div>
                        <div class="region-detail">
                            <div class="region-detail-label">数据中心</div>
                            <div class="region-detail-value">\${result.location} \${result.locationInfo || ''}</div>
                        </div>
                        \${result.error ? \`
                        <div class="region-detail">
                            <div class="region-detail-label">错误</div>
                            <div class="region-detail-value">\${result.error}</div>
                        </div>
                        \` : ''}
                    </div>
                \`;
            });
            
            resultHTML += \`
                    </div>
                </div>
            \`;
            
            resultContainer.innerHTML = resultHTML;
            
            // 显示结果容器并添加动画
            setTimeout(() => {
                resultContainer.classList.add('visible');
            }, 100);
        }
    </script>
</body>
</html>
  `.trim()
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    // 处理静态页面请求
    if (url.pathname === '/' || url.pathname === '/index.html') {
      return new Response(getHomePage(), {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      })
    }

    // 处理 API 请求
    if (url.pathname === '/api/check' && request.method === 'POST') {
      try {
        const { targetUrl, selectedRegions } = await request.json() as {
          targetUrl: string,
          selectedRegions?: LocationCode[]
        }

        if (!targetUrl) {
          return new Response(JSON.stringify({ error: '请提供目标网站URL' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          })
        }

        // 确定要检测的区域
        const regionsToCheck = selectedRegions && selectedRegions.length > 0
          ? SUPPORTED_LOCATIONS.filter(loc => selectedRegions.includes(loc.code))
          : SUPPORTED_LOCATIONS

        // 从选定位置进行检测
        const checkPromises = regionsToCheck.map(async (location) => {
          try {
            const id = env.WEBSITE_CHECKER.idFromName(`checker-${location.code}`)
            const checker = env.WEBSITE_CHECKER.get(id, { locationHint: location.code })
            const result = await checker.checkWebsite(targetUrl, location.code, location.name)
            await checker.kill()
            return result
          } catch (error) {
            return {
              url: targetUrl,
              status: null,
              statusText: 'Error',
              responseTime: 0,
              success: false,
              error: (error as Error).message,
              timestamp: new Date().toISOString(),
              location: 'Unknown',
              locationCode: location.code,
              locationName: location.name
            } as CheckResult
          }
        })

        const results = await Promise.all(checkPromises)

        return new Response(JSON.stringify({
          url: targetUrl,
          timestamp: new Date().toISOString(),
          results: results
        }), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        })
      } catch (error) {
        return new Response(JSON.stringify({
          error: '检测失败: ' + (error as Error).message
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        })
      }
    }

    // 处理 CORS 预检请求
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      })
    }

    return new Response('Not Found', { status: 404 })
  }
}

export class WebsiteChecker extends DurableObject {
  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env)
  }

  async checkWebsite(targetUrl: string, locationCode: string, locationName: string): Promise<CheckResult> {
    const startTime = Date.now()

    try {
      // 验证 URL 格式
      const url = new URL(targetUrl)
      if (!['http:', 'https:'].includes(url.protocol)) {
        throw new Error('只支持 HTTP 和 HTTPS 协议')
      }

      // 获取当前位置信息
      const location = await this.getLocation()
      // 获取数据中心的中文位置信息
      const locationInfo = this.getLocationInfo(location)

      // 发起请求
      const response = await fetch(targetUrl, {
        method: 'GET',
        headers: {
          'User-Agent': 'Boce-Website-Checker/1.0'
        },
        // 设置超时时间
        signal: AbortSignal.timeout(10000)
      })

      const responseTime = Date.now() - startTime

      return {
        url: targetUrl,
        status: response.status,
        statusText: response.statusText,
        responseTime,
        success: response.ok,
        timestamp: new Date().toISOString(),
        location,
        locationCode,
        locationName,
        locationInfo
      }

    } catch (error) {
      const responseTime = Date.now() - startTime
      const location = await this.getLocation()
      const locationInfo = this.getLocationInfo(location)

      return {
        url: targetUrl,
        status: null,
        statusText: 'Error',
        responseTime,
        success: false,
        error: (error as Error).message,
        timestamp: new Date().toISOString(),
        location,
        locationCode,
        locationName,
        locationInfo
      }
    }
  }

  async kill() {
    // This will delete all the storage associated with this Durable Object instance
    // This will also delete the Durable Object instance itself
    await this.ctx.storage.deleteAll();
  }

  private async getLocation(): Promise<string> {
    try {
      const response = await fetch('https://cloudflare.com/cdn-cgi/trace')
      const text = await response.text()
      const colo = /^colo=(.*)$/m.exec(text)?.[1]
      return colo || 'Unknown'
    } catch {
      return 'Unknown'
    }
  }

  // 获取数据中心的中文位置信息
  private getLocationInfo(coloCode: string): string {
    return CF_COLO_LOCATIONS[coloCode] || '未知位置'
  }
}