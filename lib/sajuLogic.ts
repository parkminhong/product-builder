export interface SajuInput {
  birthDate: string;
  birthTime: string;
  gender: 'male' | 'female';
  name?: string;
}

export interface SajuResult {
  structure: {
    ilgan: string;
    wolryeong: string;
    gyeokguk: string;
    johu: string;
  };
  strength: string; // Singang/Sinyak
  yongsin: {
    yongsin: string; // Useful god
    hisin: string;   // Supporting god
    gisin: string;   // Harmful god
  };
  analysis: {
    personality: string;
    wealth: string;
    career: string;
    relationship: string;
  };
  daeun: string; // Life cycles
  advice: string; // Final advice
}

// Helper to hash string to number for consistent randomness
const hashString = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

const ilgans = ['갑목(甲)', '을목(乙)', '병화(丙)', '정화(丁)', '무토(戊)', '기토(己)', '경금(庚)', '신금(辛)', '임수(壬)', '계수(癸)'];
const wolryeongs = ['인월(寅)', '묘월(卯)', '진월(辰)', '사월(巳)', '오월(午)', '미월(未)', '신월(申)', '유월(酉)', '술월(戌)', '해월(亥)', '자월(子)', '축월(丑)'];
const gyeokguks = ['식신격', '상관격', '편재격', '정재격', '편관격', '정관격', '편인격', '정인격', '건록격', '양인격'];
const johus = ['조후 시급', '조후 원만', '한습', '난조'];
const strengths = ['신강', '신약', '중화'];

const personalities = [
  "자존심이 강하고 추진력이 있으나, 때로는 독단적인 면이 보일 수 있습니다. 리더십을 발휘할 때 가장 빛납니다.",
  "섬세하고 감수성이 풍부하며, 타인의 감정을 잘 읽어냅니다. 예술적 재능이나 기획력이 뛰어납니다.",
  "현실적이고 실리를 추구하며, 꼼꼼한 일처리가 돋보입니다. 안정적인 환경에서 능력을 발휘합니다.",
  "자유분방하고 창의적이며, 얽매이는 것을 싫어합니다. 새로운 아이디어로 승부하는 분야가 맞습니다.",
  "인내심이 강하고 우직하며, 한 번 시작한 일은 끝을 봅니다. 신뢰를 바탕으로 성장하는 타입입니다."
];

const wealths = [
  "초년에는 기복이 있으나 중년 이후 안정을 찾는 흐름입니다. 투기보다는 저축과 안전자산 위주가 유리합니다.",
  "재물운의 규모가 크나, 들어오는 만큼 나가는 것도 많습니다. 현금 흐름 관리가 핵심입니다.",
  "꾸준한 소득이 보장되는 구조입니다. 사업보다는 전문직이나 직장 생활을 통해 자산을 불려가는 것이 좋습니다.",
  "횡재수보다는 본인의 노력에 비례해 재물이 따릅니다. 티끌 모아 태산이 되는 정직한 부자 사주입니다.",
  "아이디어나 기술을 통해 큰 부를 이룰 잠재력이 있습니다. 남들이 보지 못하는 시장을 공략하세요."
];

const careers = [
  "조직 생활보다는 본인의 전문성을 살리는 프리랜서나 전문직이 어울립니다.",
  "사람을 상대하는 영업, 교육, 상담 분야에서 두각을 나타낼 수 있습니다.",
  "논리적이고 분석적인 능력을 요하는 IT, 금융, 연구 분야가 적합합니다.",
  "공공기관이나 대기업 등 안정적인 시스템이 갖춰진 곳에서 승진운이 좋습니다.",
  "창작, 예술, 디자인 등 본인의 개성을 표현하는 분야에서 성공할 수 있습니다."
];

const relationships = [
  "상대방을 리드하는 스타일이나, 가끔은 상대의 의견을 경청하는 자세가 필요합니다.",
  "다정다감하지만 우유부단해 보일 수 있습니다. 맺고 끊음이 확실해야 관계가 오래갑니다.",
  "신중하게 사람을 사귀며, 한 번 맺은 인연은 오래가는 편입니다.",
  "이성에게 인기가 많으나, 실속 없는 만남이 잦을 수 있으니 사람 보는 눈을 키워야 합니다.",
  "배우자 덕이 있는 편이며, 결혼 후 안정을 찾는 흐름입니다."
];

export const analyzeSaju = (input: SajuInput): SajuResult => {
  const seed = hashString(input.birthDate + input.birthTime + input.gender);
  
  const ilgan = ilgans[seed % ilgans.length];
  const wolryeong = wolryeongs[(seed + 1) % wolryeongs.length];
  const gyeokguk = gyeokguks[(seed + 2) % gyeokguks.length];
  const johu = johus[(seed + 3) % johus.length];
  const strength = strengths[(seed + 4) % strengths.length];
  
  // Logic to determine Yongsin based on Strength (simplified simulation)
  let yongsin = '', hisin = '', gisin = '';
  if (strength === '신강') {
    yongsin = '식상/관성';
    hisin = '재성';
    gisin = '인성/비겁';
  } else {
    yongsin = '인성/비겁';
    hisin = '관성'; // Simplified
    gisin = '식상/재성';
  }

  return {
    structure: { ilgan, wolryeong, gyeokguk, johu },
    strength,
    yongsin: { yongsin, hisin, gisin },
    analysis: {
      personality: personalities[seed % personalities.length],
      wealth: wealths[(seed + 2) % wealths.length],
      career: careers[(seed + 4) % careers.length],
      relationship: relationships[(seed + 6) % relationships.length],
    },
    daeun: `대운수는 ${seed % 10}이며, 현재 ${['갑자', '을축', '병인', '정묘'][seed % 4]} 대운을 지나고 있습니다. 인생의 변곡점에 와 있습니다.`,
    advice: "지금은 멈춰야 할 때가 아니라, 뿌리를 깊게 내릴 때입니다. 겉으로 드러나는 성과보다 내실을 다지세요."
  };
};
