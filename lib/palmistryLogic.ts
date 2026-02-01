export interface PalmResult {
  lifeLine: string;
  headLine: string;
  heartLine: string;
  summary: string;
}

const lifeLines = [
  "생명선이 굵고 길게 뻗어 있어 기본 체력이 튼튼하고 장수할 상입니다. 다만 중년 이후 과로를 주의하세요.",
  "생명선 중간에 섬 문양이 보입니다. 이는 한 차례 건강상의 고비나 슬럼프를 의미하지만, 잘 극복하면 더 단단해집니다.",
  "생명선이 이중으로 되어 있어 활력이 넘치고 회복력이 뛰어납니다. 에너지를 주체하지 못해 여러 일을 벌일 수 있습니다.",
  "생명선이 완만하게 금성구를 감싸고 있어 성격이 온화하고 가정적입니다. 안정적인 삶을 추구합니다."
];

const headLines = [
  "두뇌선이 월구로 길게 하향하여 창의력과 상상력이 풍부합니다. 예술이나 기획 분야가 적성입니다.",
  "두뇌선이 직선으로 뻗어 현실적이고 논리적인 사고를 합니다. 이공계나 실무적인 일에 능통합니다.",
  "두뇌선이 짧지만 굵어 판단력이 빠르고 직관적입니다. 순간적인 대처 능력이 뛰어납니다.",
  "두뇌선 끝이 갈라져 있어 다재다능하고 두 가지 이상의 분야에 관심을 가질 수 있습니다."
];

const heartLines = [
  "감정선이 검지 아래까지 길게 뻗어 있어 사랑에 헌신적이고 이상적인 연애를 꿈꿉니다.",
  "감정선이 중지 아래에서 멈춰 현실적이고 쿨한 연애관을 가지고 있습니다. 감정 소비를 싫어합니다.",
  "감정선이 쇠사슬 모양으로 얽혀 있어 감정 기복이 심하고 섬세합니다. 예술가적 기질이 다분합니다.",
  "감정선이 직선에 가까워 감정 표현이 서툴지만 속정은 깊은 타입입니다."
];

const summaries = [
  "전반적으로 손금의 선들이 굵고 선명하여 주관이 뚜렷한 삶을 살게 됩니다. 다만 독선을 경계하세요.",
  "잔선이 많아 생각이 많고 신경이 예민한 편입니다. 마음의 여유를 가지는 것이 개운의 핵심입니다.",
  "주요 선들이 조화를 이루어 평탄하고 안정적인 인생이 예상됩니다. 큰 굴곡 없는 것이 가장 큰 복입니다.",
  "손바닥이 도톰하고 색이 붉어 재물복이 타고났습니다. 들어오는 돈을 잘 지키는 것이 관건입니다."
];

export const analyzePalm = async (file: File): Promise<PalmResult> => {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Use file name length or size to pseudo-randomize
  const seed = file.name.length + file.size;

  return {
    lifeLine: lifeLines[seed % lifeLines.length],
    headLine: headLines[(seed + 1) % headLines.length],
    heartLine: heartLines[(seed + 2) % heartLines.length],
    summary: summaries[(seed + 3) % summaries.length]
  };
};
