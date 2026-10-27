import { Question, DomainKey, DomainResult, FacetResult, ScoreLevel, DomainMeta, BigFiveResult } from '../types/bigfive';

export const CHOICES_PT_BR = [
  { text: 'Discordo totalmente', value: 1, level: 'low' },
  { text: 'Discordo parcialmente', value: 2, level: 'low' },
  { text: 'Nem discordo, nem concordo', value: 3, level: 'neutral' },
  { text: 'Concordo parcialmente', value: 4, level: 'high' },
  { text: 'Concordo totalmente', value: 5, level: 'high' },
] as const;

export const DOMAINS_META: Record<DomainKey, DomainMeta> = {
  O: {
    key: 'O',
    name: 'Abertura à Experiência',
    englishName: 'Openness to Experience',
    subtitle: 'Criatividade, imaginação e curiosidade intelectual',
    color: '#0284c7',
    bgLight: 'bg-sky-50',
    borderColor: 'border-sky-300',
    textColor: 'text-sky-700',
    icon: 'Sparkles',
    summary: 'Mede a abertura a novas ideias, arte, sensações e imaginação ativa em contraste com o convencional e prático.',
    lowLabel: 'Pragmático & Tradicional',
    highLabel: 'Criativo & Curioso'
  },
  C: {
    key: 'C',
    name: 'Conscienciosidade',
    englishName: 'Conscientiousness',
    subtitle: 'Organização, disciplina e persistência focada em metas',
    color: '#059669',
    bgLight: 'bg-emerald-50',
    borderColor: 'border-emerald-300',
    textColor: 'text-emerald-700',
    icon: 'CheckCircle2',
    summary: 'Reflete como controlamos, regulamos e direcionamos nossos impulsos para cumprir metas e manter organização.',
    lowLabel: 'Flexível & Espontâneo',
    highLabel: 'Disciplinado & Metódico'
  },
  E: {
    key: 'E',
    name: 'Extroversão',
    englishName: 'Extraversion',
    subtitle: 'Energia social, assertividade e busca por estímulos',
    color: '#d97706',
    bgLight: 'bg-amber-50',
    borderColor: 'border-amber-300',
    textColor: 'text-amber-700',
    icon: 'Users',
    summary: 'Indica a orientação e intensidade das interações interpessoais, entusiasmo e disposição para a ação em grupo.',
    lowLabel: 'Reservado & Introspectivo',
    highLabel: 'Comunicativo & Entusiasmado'
  },
  A: {
    key: 'A',
    name: 'Amabilidade / Afabilidade',
    englishName: 'Agreeableness',
    subtitle: 'Cooperação, empatia, altruísmo e consideração mútua',
    color: '#7c3aed',
    bgLight: 'bg-purple-50',
    borderColor: 'border-purple-300',
    textColor: 'text-purple-700',
    icon: 'Heart',
    summary: 'Avalia a qualidade das relações interpessoais ao longo de um continuum que vai da compaixão à cooperação calorosa.',
    lowLabel: 'Competitivo & Cético',
    highLabel: 'Empático & Cooperativo'
  },
  N: {
    key: 'N',
    name: 'Neuroticismo',
    englishName: 'Neuroticism (Reatividade Emocional)',
    subtitle: 'Estabilidade emocional vs. sensibilidade ao estresse',
    color: '#e11d48',
    bgLight: 'bg-rose-50',
    borderColor: 'border-rose-300',
    textColor: 'text-rose-700',
    icon: 'ShieldAlert',
    summary: 'Mede a sensibilidade ao estresse e a propensão a vivenciar oscilações emocionais perante desafios da vida.',
    lowLabel: 'Calmo & Resiliente',
    highLabel: 'Sensível & Emotivo'
  }
};

export const RAW_QUESTIONS: Question[] = [
  {
    "id": "43c98ce8-a07a-4dc2-80f6-c1b2a2485f06",
    "text": "Me preocupo com as coisas",
    "keyed": "plus",
    "domain": "N",
    "facet": 1,
    "num": 1
  },
  {
    "id": "d50a597f-632b-4f7b-89e6-6d85b50fd1c9",
    "text": "Faço amigos com facilidade",
    "keyed": "plus",
    "domain": "E",
    "facet": 1,
    "num": 2
  },
  {
    "id": "888dd864-7449-4e96-8d5c-7a439603ea91",
    "text": "Tenho uma imaginação fértil",
    "keyed": "plus",
    "domain": "O",
    "facet": 1,
    "num": 3
  },
  {
    "id": "ce2fbbf8-7a97-4199-bda5-117e4ecdf3b6",
    "text": "Confio nos outros",
    "keyed": "plus",
    "domain": "A",
    "facet": 1,
    "num": 4
  },
  {
    "id": "c7f53c3c-2e77-432f-bb71-7470b67d3aa9",
    "text": "Concluo as tarefas com sucesso",
    "keyed": "plus",
    "domain": "C",
    "facet": 1,
    "num": 5
  },
  {
    "id": "48ad12ce-470e-4339-90ac-ea8c43a0103e",
    "text": "Fico com raiva facilmente",
    "keyed": "plus",
    "domain": "N",
    "facet": 2,
    "num": 6
  },
  {
    "id": "458f3957-2359-4077-ade1-34525d633063",
    "text": "Amo grandes festas",
    "keyed": "plus",
    "domain": "E",
    "facet": 2,
    "num": 7
  },
  {
    "id": "58d571e5-d725-4cf8-a438-32c16ee28eb6",
    "text": "Acredito na importância da arte",
    "keyed": "plus",
    "domain": "O",
    "facet": 2,
    "num": 8
  },
  {
    "id": "0cf79e27-e702-45c2-9471-04ac96b58e0e",
    "text": "Uso os outros para alcançar meus fins",
    "keyed": "minus",
    "domain": "A",
    "facet": 2,
    "num": 9
  },
  {
    "id": "cda1ca17-b599-4561-a6cd-ff9d36062d27",
    "text": "Gosto de organizar as coisas",
    "keyed": "plus",
    "domain": "C",
    "facet": 2,
    "num": 10
  },
  {
    "id": "5e8550d7-b8ef-4905-950a-f81d735d39e2",
    "text": "Frequentemente me sinto triste",
    "keyed": "plus",
    "domain": "N",
    "facet": 3,
    "num": 11
  },
  {
    "id": "8af754f2-68e9-48f3-8c5d-2e6633d4472c",
    "text": "Assumo a liderança das coisas",
    "keyed": "plus",
    "domain": "E",
    "facet": 3,
    "num": 12
  },
  {
    "id": "0727def6-3d18-4221-bf38-86b58f9f3eed",
    "text": "Experimento minhas emoções intensamente",
    "keyed": "plus",
    "domain": "O",
    "facet": 3,
    "num": 13
  },
  {
    "id": "ccf3a5c8-fb50-4bd4-8e7a-22af3d657279",
    "text": "Adoro ajudar aos outros",
    "keyed": "plus",
    "domain": "A",
    "facet": 3,
    "num": 14
  },
  {
    "id": "73d84e5d-cbf5-47f0-b8cb-4d2159a52e32",
    "text": "Mantenho minhas promessas",
    "keyed": "plus",
    "domain": "C",
    "facet": 3,
    "num": 15
  },
  {
    "id": "b2d9ef74-73f5-4ea8-b00c-7aaca15937df",
    "text": "Tenho dificuldade de me aproximar dos outros",
    "keyed": "plus",
    "domain": "N",
    "facet": 4,
    "num": 16
  },
  {
    "id": "48a761ef-438e-409b-ae59-ea2ce8f84414",
    "text": "Estou sempre ocupado(a)",
    "keyed": "plus",
    "domain": "E",
    "facet": 4,
    "num": 17
  },
  {
    "id": "cae55842-8957-4e3b-83b3-ceff98fb9dcf",
    "text": "Prefiro variedade à rotina",
    "keyed": "plus",
    "domain": "O",
    "facet": 4,
    "num": 18
  },
  {
    "id": "e2028ad3-b128-4f76-be57-398bfe2aff22",
    "text": "Amo uma boa briga",
    "keyed": "minus",
    "domain": "A",
    "facet": 4,
    "num": 19
  },
  {
    "id": "b7fc949b-02b6-4cb9-a3e2-dbb3d824b55f",
    "text": "Trabalho muito",
    "keyed": "plus",
    "domain": "C",
    "facet": 4,
    "num": 20
  },
  {
    "id": "481efd08-c810-43b1-a952-f8ac9052f96b",
    "text": "Adoro ir em farras",
    "keyed": "plus",
    "domain": "N",
    "facet": 5,
    "num": 21
  },
  {
    "id": "987efee2-899f-4a65-b9b5-1589ef0460d7",
    "text": "Busco sempre emoção (adrenalina)",
    "keyed": "plus",
    "domain": "E",
    "facet": 5,
    "num": 22
  },
  {
    "id": "e1e804c7-4a1d-498f-8610-f95147af9d1d",
    "text": "Gosto de ler textos desafiadores",
    "keyed": "plus",
    "domain": "O",
    "facet": 5,
    "num": 23
  },
  {
    "id": "71029381-3908-4c68-91e1-e41fb45542a2",
    "text": "Acredito ser melhor que os outros",
    "keyed": "minus",
    "domain": "A",
    "facet": 5,
    "num": 24
  },
  {
    "id": "f6076eea-56ae-4b46-97f1-5f94a7676c96",
    "text": "Estou sempre preparado(a)",
    "keyed": "plus",
    "domain": "C",
    "facet": 5,
    "num": 25
  },
  {
    "id": "2f519935-92e8-48ad-9746-4a0f8b38466a",
    "text": "Entro em pânico facilmente",
    "keyed": "plus",
    "domain": "N",
    "facet": 6,
    "num": 26
  },
  {
    "id": "899c3f66-51d0-46ea-963a-6fc36d3b3cb9",
    "text": "Irradio alegria",
    "keyed": "plus",
    "domain": "E",
    "facet": 6,
    "num": 27
  },
  {
    "id": "79186f48-e7fa-4df4-b74b-b0627ee244e1",
    "text": "Costumo votar em candidatos políticos liberais (progressistas)",
    "keyed": "plus",
    "domain": "O",
    "facet": 6,
    "num": 28
  },
  {
    "id": "fd50e1ca-d9e0-4037-a7a1-a191d4db2d96",
    "text": "Me preocupo com os desabrigados",
    "keyed": "plus",
    "domain": "A",
    "facet": 6,
    "num": 29
  },
  {
    "id": "bd9eec0a-b68b-472c-8803-7db29c308cdb",
    "text": "Mergulho de cabeça nas coisas sem pensar",
    "keyed": "minus",
    "domain": "C",
    "facet": 6,
    "num": 30
  },
  {
    "id": "7f92ab2c-265c-4b84-8c74-09f9bb9d41a7",
    "text": "Temo o pior",
    "keyed": "plus",
    "domain": "N",
    "facet": 1,
    "num": 31
  },
  {
    "id": "af55f014-788c-4b6e-92c4-b2b59dc8a28d",
    "text": "Me sinto confortável no meio das pessoas",
    "keyed": "plus",
    "domain": "E",
    "facet": 1,
    "num": 32
  },
  {
    "id": "08ff6dca-02a5-4aeb-aaa4-2ecf2526f143",
    "text": "Adoro histórias fantásticas de fantasia e ficção",
    "keyed": "plus",
    "domain": "O",
    "facet": 1,
    "num": 33
  },
  {
    "id": "6f66cdc0-9044-457b-b40d-501ecae15ee7",
    "text": "Acredito que os outros têm boas intenções",
    "keyed": "plus",
    "domain": "A",
    "facet": 1,
    "num": 34
  },
  {
    "id": "f110fc66-2e9e-413c-920b-19f05e63d7ac",
    "text": "Sou excelente no que eu faço",
    "keyed": "plus",
    "domain": "C",
    "facet": 1,
    "num": 35
  },
  {
    "id": "7dab2a37-8635-4fc7-86b7-0abf13c183c9",
    "text": "Me irrito facilmente",
    "keyed": "plus",
    "domain": "N",
    "facet": 2,
    "num": 36
  },
  {
    "id": "28ab59a0-e7cd-4fce-94e3-bba2ecc023b6",
    "text": "Converso com muitas pessoas diferentes em festas",
    "keyed": "plus",
    "domain": "E",
    "facet": 2,
    "num": 37
  },
  {
    "id": "b5919f2f-cded-4745-a9ce-c02703cee807",
    "text": "Vejo beleza em coisas que outros podem não notar",
    "keyed": "plus",
    "domain": "O",
    "facet": 2,
    "num": 38
  },
  {
    "id": "5a5fa975-d024-4ac8-8845-2823f957c21b",
    "text": "Trapaceio para tirar vantagem",
    "keyed": "minus",
    "domain": "A",
    "facet": 2,
    "num": 39
  },
  {
    "id": "adf33f9f-45bd-43e3-af25-4c491176d97f",
    "text": "Frequentemente esqueço de colocar as coisas de volta em seu lugar",
    "keyed": "minus",
    "domain": "C",
    "facet": 2,
    "num": 40
  },
  {
    "id": "f0a14e16-d726-47e9-a2c1-647fd3d7d52e",
    "text": "Não gosto de mim",
    "keyed": "plus",
    "domain": "N",
    "facet": 3,
    "num": 41
  },
  {
    "id": "0b38e3d3-c15c-454c-b034-f4eb7ae1580a",
    "text": "Tento liderar os outros",
    "keyed": "plus",
    "domain": "E",
    "facet": 3,
    "num": 42
  },
  {
    "id": "5631b856-ff34-4f76-a0cd-edc7104c3bfa",
    "text": "Sinto as emoções dos outros",
    "keyed": "plus",
    "domain": "O",
    "facet": 3,
    "num": 43
  },
  {
    "id": "ada867af-4db1-4e3d-a604-2b695c1806e5",
    "text": "Me preocupo com os outros",
    "keyed": "plus",
    "domain": "A",
    "facet": 3,
    "num": 44
  },
  {
    "id": "c55e3958-00c4-4fc3-9118-47d8f31bfde1",
    "text": "Digo a verdade",
    "keyed": "plus",
    "domain": "C",
    "facet": 3,
    "num": 45
  },
  {
    "id": "acd8fadc-5399-4a67-b5ff-9d1ada049c01",
    "text": "Tenho medo de chamar a atenção",
    "keyed": "plus",
    "domain": "N",
    "facet": 4,
    "num": 46
  },
  {
    "id": "d07b6c67-0d02-4948-a997-bb84ac234cd8",
    "text": "Estou sempre preparado(a)",
    "keyed": "plus",
    "domain": "E",
    "facet": 4,
    "num": 47
  },
  {
    "id": "33b81fd0-7e32-4cd8-a13a-d5f5f754f998",
    "text": "Prefiro lidar com coisas que eu conheça",
    "keyed": "minus",
    "domain": "O",
    "facet": 4,
    "num": 48
  },
  {
    "id": "d9a9a180-29c9-4ec5-8621-2256d411def7",
    "text": "Grito com os outros",
    "keyed": "minus",
    "domain": "A",
    "facet": 4,
    "num": 49
  },
  {
    "id": "f12c3d9d-1d12-4aa6-ad2e-009cd0651cbb",
    "text": "Supero as expectativas",
    "keyed": "plus",
    "domain": "C",
    "facet": 4,
    "num": 50
  },
  {
    "id": "9891b7ba-a494-4307-aafe-301d8db506c6",
    "text": "Raramente me excedo em festas",
    "keyed": "minus",
    "domain": "N",
    "facet": 5,
    "num": 51
  },
  {
    "id": "f1675af6-88bf-4376-a946-0281e762b39c",
    "text": "Busco aventura",
    "keyed": "plus",
    "domain": "E",
    "facet": 5,
    "num": 52
  },
  {
    "id": "95a3f20c-f933-4d19-a2c1-a7dbdf63c562",
    "text": "Evito discussões filosóficas",
    "keyed": "minus",
    "domain": "O",
    "facet": 5,
    "num": 53
  },
  {
    "id": "7df44711-4cd4-4b05-8830-73fcc3ebdab5",
    "text": "Penso muito em mim",
    "keyed": "minus",
    "domain": "A",
    "facet": 5,
    "num": 54
  },
  {
    "id": "9d3cb5c7-955c-43a4-b6c7-b07ed01dcbd9",
    "text": "Transformo meus planos em realidade",
    "keyed": "plus",
    "domain": "C",
    "facet": 5,
    "num": 55
  },
  {
    "id": "13c58810-3864-42ba-aa87-d4166f858756",
    "text": "Me sinto sobrecarregado(a) com os eventos",
    "keyed": "plus",
    "domain": "N",
    "facet": 6,
    "num": 56
  },
  {
    "id": "961376e0-16a1-4c14-b059-789e63d11b63",
    "text": "Me divirto bastante",
    "keyed": "plus",
    "domain": "E",
    "facet": 6,
    "num": 57
  },
  {
    "id": "f08e1b27-3673-4898-9cae-896482d0d9f9",
    "text": "Acredito que certo e errado são relativos",
    "keyed": "plus",
    "domain": "O",
    "facet": 6,
    "num": 58
  },
  {
    "id": "c2038c12-7a37-47a8-9983-831bd6692aab",
    "text": "Sinto simpatia por aqueles que estão em situação pior do que eu",
    "keyed": "plus",
    "domain": "A",
    "facet": 6,
    "num": 59
  },
  {
    "id": "956f3e17-ff17-4af5-a52f-9222b8968106",
    "text": "Tomo decisões difíceis",
    "keyed": "minus",
    "domain": "C",
    "facet": 6,
    "num": 60
  },
  {
    "id": "4d81238b-5407-47d4-88e5-dc0e38aa14f5",
    "text": "Tenho medo de muitas coisas",
    "keyed": "plus",
    "domain": "N",
    "facet": 1,
    "num": 61
  },
  {
    "id": "9f9166f0-fa94-4c14-a91d-3eecd8395794",
    "text": "Evito contatos com outras pessoas",
    "keyed": "minus",
    "domain": "E",
    "facet": 1,
    "num": 62
  },
  {
    "id": "23a1034f-fab7-4887-a66e-5ef4eaafb25e",
    "text": "Amo ficar sonhando no mundo da lua",
    "keyed": "plus",
    "domain": "O",
    "facet": 1,
    "num": 63
  },
  {
    "id": "c63e6121-c3ed-40cc-abc2-c1e6ea1e0858",
    "text": "Confio no que as pessoas dizem",
    "keyed": "plus",
    "domain": "A",
    "facet": 1,
    "num": 64
  },
  {
    "id": "02ee1930-36a7-4caa-b10c-c93efb682a44",
    "text": "Executo as tarefas sem maiores problemas",
    "keyed": "plus",
    "domain": "C",
    "facet": 1,
    "num": 65
  },
  {
    "id": "da8e6ed1-2296-4c58-8fdb-66f2f591989b",
    "text": "Perco a paciência facilmente",
    "keyed": "plus",
    "domain": "N",
    "facet": 2,
    "num": 66
  },
  {
    "id": "03c10b30-b88f-4c63-8acc-71251ca24615",
    "text": "Prefiro ficar sozinho(a)",
    "keyed": "minus",
    "domain": "E",
    "facet": 2,
    "num": 67
  },
  {
    "id": "751a04bc-5adf-485a-8ea4-4308406ae85b",
    "text": "Não gosto de poesia",
    "keyed": "minus",
    "domain": "O",
    "facet": 2,
    "num": 68
  },
  {
    "id": "982e83c2-d34e-48da-9c71-78494ab05c85",
    "text": "Tiro vantagem dos outros",
    "keyed": "minus",
    "domain": "A",
    "facet": 2,
    "num": 69
  },
  {
    "id": "f4891687-0ff0-47af-a4f6-d1202c8f6676",
    "text": "Meu quarto é uma bagunça",
    "keyed": "minus",
    "domain": "C",
    "facet": 2,
    "num": 70
  },
  {
    "id": "743d8973-1de1-4485-91b4-8a5cf63e7d44",
    "text": "Estou sempre deprimido(a)",
    "keyed": "plus",
    "domain": "N",
    "facet": 3,
    "num": 71
  },
  {
    "id": "2452f034-8273-4f71-9122-a40f5ead31ba",
    "text": "Assumo o controle das coisas",
    "keyed": "plus",
    "domain": "E",
    "facet": 3,
    "num": 72
  },
  {
    "id": "2a300001-6e05-4c79-b8b5-2ccae4c3d463",
    "text": "Raramente percebo minhas reações emocionais",
    "keyed": "minus",
    "domain": "O",
    "facet": 3,
    "num": 73
  },
  {
    "id": "cd54bd76-ca9c-4030-b325-bb8d896bcb3f",
    "text": "Sou indiferente ao sentimento dos outros",
    "keyed": "minus",
    "domain": "A",
    "facet": 3,
    "num": 74
  },
  {
    "id": "4e6e3a34-176f-4e6e-8730-1341611f972b",
    "text": "Quebro as regras",
    "keyed": "minus",
    "domain": "C",
    "facet": 3,
    "num": 75
  },
  {
    "id": "20062533-a33d-4c1e-9cd9-bff868015b3f",
    "text": "Só me sinto bem com meus amigos(as)",
    "keyed": "plus",
    "domain": "N",
    "facet": 4,
    "num": 76
  },
  {
    "id": "b2a077d5-1fe0-4b06-ab63-35455e001e54",
    "text": "Faço muitas coisas no tempo livre",
    "keyed": "plus",
    "domain": "E",
    "facet": 4,
    "num": 77
  },
  {
    "id": "0d2e65ab-95d9-482f-beb4-3239a3a4944a",
    "text": "Não gosto de mudanças",
    "keyed": "minus",
    "domain": "O",
    "facet": 4,
    "num": 78
  },
  {
    "id": "0de0f900-cede-4538-9c00-5da4f830b028",
    "text": "Insulto os outros",
    "keyed": "minus",
    "domain": "A",
    "facet": 4,
    "num": 79
  },
  {
    "id": "a9c97d6b-6721-4150-8d84-64ef3082f164",
    "text": "Eu trabalho apenas o suficiente para sobreviver",
    "keyed": "minus",
    "domain": "C",
    "facet": 4,
    "num": 80
  },
  {
    "id": "9f2e7f90-0ca5-4ed0-9fe5-e060238a9b5e",
    "text": "Resisto facilmente às tentações",
    "keyed": "minus",
    "domain": "N",
    "facet": 5,
    "num": 81
  },
  {
    "id": "7dd6cf2d-5c14-48c2-8ae5-633a7a596c71",
    "text": "Gosto de ser inconsequente",
    "keyed": "plus",
    "domain": "E",
    "facet": 5,
    "num": 82
  },
  {
    "id": "fecc35f7-681e-4889-a404-4a973a3dfef0",
    "text": "Tenho dificuldade em entender ideias abstratas",
    "keyed": "minus",
    "domain": "O",
    "facet": 5,
    "num": 83
  },
  {
    "id": "1d686958-6fe7-432f-85e6-186b99e4e232",
    "text": "Tenho uma opinião muito positiva sobre mim mesmo(a)",
    "keyed": "minus",
    "domain": "A",
    "facet": 5,
    "num": 84
  },
  {
    "id": "c7db0ed8-df7d-49bf-942f-59e46ef743c4",
    "text": "Fico perdendo tempo",
    "keyed": "minus",
    "domain": "C",
    "facet": 5,
    "num": 85
  },
  {
    "id": "b7e0e393-9b21-4e0d-adf3-8f28fb5b9d87",
    "text": "Sinto que sou incapaz de lidar com as coisas",
    "keyed": "plus",
    "domain": "N",
    "facet": 6,
    "num": 86
  },
  {
    "id": "79d956e8-1118-402a-a0e2-9380af18243e",
    "text": "Amo a vida",
    "keyed": "plus",
    "domain": "E",
    "facet": 6,
    "num": 87
  },
  {
    "id": "96ba77b2-1a44-4dfd-95f9-ae4d1f714460",
    "text": "Costumo votar em candidatos políticos conservadores",
    "keyed": "minus",
    "domain": "O",
    "facet": 6,
    "num": 88
  },
  {
    "id": "77f54ab4-0fba-4efb-8700-066c7490eb87",
    "text": "Não me interesso pelos problemas dos outros",
    "keyed": "minus",
    "domain": "A",
    "facet": 6,
    "num": 89
  },
  {
    "id": "a354cf7c-8d11-46ac-acc5-da90d2048637",
    "text": "Me apresso nas coisas",
    "keyed": "minus",
    "domain": "C",
    "facet": 6,
    "num": 90
  },
  {
    "id": "43b03992-3f32-4ed1-a6f8-5d6d3e7ed246",
    "text": "Me estresso facilmente",
    "keyed": "plus",
    "domain": "N",
    "facet": 1,
    "num": 91
  },
  {
    "id": "41702602-08e4-4e2b-9a19-291d9efc581a",
    "text": "Mantenho distância dos outros",
    "keyed": "minus",
    "domain": "E",
    "facet": 1,
    "num": 92
  },
  {
    "id": "935a7413-abac-4f54-9169-d1fbd39da752",
    "text": "Gosto de me perder em pensamentos",
    "keyed": "plus",
    "domain": "O",
    "facet": 1,
    "num": 93
  },
  {
    "id": "432dbde8-8756-4ff0-80d5-f47018235139",
    "text": "Desconfio das pessoas",
    "keyed": "minus",
    "domain": "A",
    "facet": 1,
    "num": 94
  },
  {
    "id": "5727c93f-317b-4af1-a686-77fc9fbc5033",
    "text": "Sei como fazer as coisas",
    "keyed": "plus",
    "domain": "C",
    "facet": 1,
    "num": 95
  },
  {
    "id": "d32bd062-4eb2-401b-99b2-e7afea39ca9b",
    "text": "Não me incomodo facilmente",
    "keyed": "minus",
    "domain": "N",
    "facet": 2,
    "num": 96
  },
  {
    "id": "9a47184f-6046-4e68-a61b-3d9b357b86ea",
    "text": "Evito multidões",
    "keyed": "minus",
    "domain": "E",
    "facet": 2,
    "num": 97
  },
  {
    "id": "87c5b27e-59a8-4c48-8ba8-f5413d735693",
    "text": "Não gosto de ir ao museu de arte",
    "keyed": "minus",
    "domain": "O",
    "facet": 2,
    "num": 98
  },
  {
    "id": "11b20adb-abed-4363-894c-3dd823ae0540",
    "text": "Atrapalho os planos dos outros",
    "keyed": "minus",
    "domain": "A",
    "facet": 2,
    "num": 99
  },
  {
    "id": "50418d86-712c-45d9-adc4-ea0231c93cf5",
    "text": "Deixo minhas coisas espalhadas",
    "keyed": "minus",
    "domain": "C",
    "facet": 2,
    "num": 100
  },
  {
    "id": "f40e421f-6c24-4be2-bd9f-28d33358d8c6",
    "text": "Me sinto confortável comigo mesmo(a)",
    "keyed": "minus",
    "domain": "N",
    "facet": 3,
    "num": 101
  },
  {
    "id": "8791f37b-686f-47c3-9db7-74c009951321",
    "text": "Aguardo outras pessoas tomarem a liderança das coisas",
    "keyed": "minus",
    "domain": "E",
    "facet": 3,
    "num": 102
  },
  {
    "id": "4fd25155-9cc2-4cd6-8852-3e0ca2d5e95d",
    "text": "Não entendo pessoas que agem emotivamente",
    "keyed": "minus",
    "domain": "O",
    "facet": 3,
    "num": 103
  },
  {
    "id": "b68af20d-24f9-4c27-85cc-fe0858994888",
    "text": "Não tiro tempo para os outros",
    "keyed": "minus",
    "domain": "A",
    "facet": 3,
    "num": 104
  },
  {
    "id": "54423933-0ebb-44a7-bdd9-2a9b100c70f2",
    "text": "Quebro minhas promessas",
    "keyed": "minus",
    "domain": "C",
    "facet": 3,
    "num": 105
  },
  {
    "id": "7317848c-3e1b-422f-bb16-02efc504f677",
    "text": "Não me incomodo com situações sociais difíceis",
    "keyed": "minus",
    "domain": "N",
    "facet": 4,
    "num": 106
  },
  {
    "id": "7d93e1ca-46e8-4a30-9623-42a80c9b420c",
    "text": "Gosto de pegar leve",
    "keyed": "minus",
    "domain": "E",
    "facet": 4,
    "num": 107
  },
  {
    "id": "a7f43928-8982-4ed5-8656-7a80346fe979",
    "text": "Me considero ter costumes tradicionais",
    "keyed": "minus",
    "domain": "O",
    "facet": 4,
    "num": 108
  },
  {
    "id": "17910a55-a64a-4ed0-8b46-293e2fa2fe03",
    "text": "Entro em contato com os outros",
    "keyed": "minus",
    "domain": "A",
    "facet": 4,
    "num": 109
  },
  {
    "id": "3890bb43-2695-4b8d-b289-ee10d11cc884",
    "text": "Dedico pouco tempo e esforço no meu trabalho",
    "keyed": "minus",
    "domain": "C",
    "facet": 4,
    "num": 110
  },
  {
    "id": "49a85680-53aa-4208-86b5-dccc7a6f8e37",
    "text": "Controlo minhas vontades",
    "keyed": "minus",
    "domain": "N",
    "facet": 5,
    "num": 111
  },
  {
    "id": "10f90fa9-649c-4631-ac4c-3dd3f751597d",
    "text": "Ajo de forma descontrolada",
    "keyed": "plus",
    "domain": "E",
    "facet": 5,
    "num": 112
  },
  {
    "id": "b86de003-c3c4-4cc8-9385-5ac8a0142c34",
    "text": "Não me interesso por discussões teóricas",
    "keyed": "minus",
    "domain": "O",
    "facet": 5,
    "num": 113
  },
  {
    "id": "80c1d149-7050-481a-9953-aefb441642e7",
    "text": "Gosto de falar das minhas virtudes",
    "keyed": "minus",
    "domain": "A",
    "facet": 5,
    "num": 114
  },
  {
    "id": "51403620-968c-42fa-a772-65ba5ad8396f",
    "text": "Tenho dificuldade para começar as tarefas",
    "keyed": "minus",
    "domain": "C",
    "facet": 5,
    "num": 115
  },
  {
    "id": "88a3c2fe-3aa4-4f46-9322-da656332268a",
    "text": "Permaneço calmo(a) sob pressão",
    "keyed": "minus",
    "domain": "N",
    "facet": 6,
    "num": 116
  },
  {
    "id": "e7b31bdc-5f6b-40ec-ba91-f5919b0f170e",
    "text": "Vejo o lado bom da vida",
    "keyed": "plus",
    "domain": "E",
    "facet": 6,
    "num": 117
  },
  {
    "id": "580b08d1-3c94-46e9-9d07-d6d80c698127",
    "text": "Acredito que precisamos ser rígidos com o crime",
    "keyed": "minus",
    "domain": "O",
    "facet": 6,
    "num": 118
  },
  {
    "id": "48bee420-60c0-45cd-be43-3893dbc1969a",
    "text": "Tento não pensar nos necessitados",
    "keyed": "minus",
    "domain": "A",
    "facet": 6,
    "num": 119
  },
  {
    "id": "ea3327ea-3529-4be4-8e2d-2174731ae4d7",
    "text": "Ajo sem pensar",
    "keyed": "minus",
    "domain": "C",
    "facet": 6,
    "num": 120
  }
];

export const SHORT_QUESTIONS: Question[] = [
  {
    "id": "888dd864-7449-4e96-8d5c-7a439603ea91",
    "text": "Tenho uma imaginação fértil",
    "keyed": "plus",
    "domain": "O",
    "facet": 1,
    "num": 3
  },
  {
    "id": "58d571e5-d725-4cf8-a438-32c16ee28eb6",
    "text": "Acredito na importância da arte",
    "keyed": "plus",
    "domain": "O",
    "facet": 2,
    "num": 8
  },
  {
    "id": "0727def6-3d18-4221-bf38-86b58f9f3eed",
    "text": "Experimento minhas emoções intensamente",
    "keyed": "plus",
    "domain": "O",
    "facet": 3,
    "num": 13
  },
  {
    "id": "cae55842-8957-4e3b-83b3-ceff98fb9dcf",
    "text": "Prefiro variedade à rotina",
    "keyed": "plus",
    "domain": "O",
    "facet": 4,
    "num": 18
  },
  {
    "id": "e1e804c7-4a1d-498f-8610-f95147af9d1d",
    "text": "Gosto de ler textos desafiadores",
    "keyed": "plus",
    "domain": "O",
    "facet": 5,
    "num": 23
  },
  {
    "id": "79186f48-e7fa-4df4-b74b-b0627ee244e1",
    "text": "Costumo votar em candidatos políticos liberais (progressistas)",
    "keyed": "plus",
    "domain": "O",
    "facet": 6,
    "num": 28
  },
  {
    "id": "c7f53c3c-2e77-432f-bb71-7470b67d3aa9",
    "text": "Concluo as tarefas com sucesso",
    "keyed": "plus",
    "domain": "C",
    "facet": 1,
    "num": 5
  },
  {
    "id": "cda1ca17-b599-4561-a6cd-ff9d36062d27",
    "text": "Gosto de organizar as coisas",
    "keyed": "plus",
    "domain": "C",
    "facet": 2,
    "num": 10
  },
  {
    "id": "73d84e5d-cbf5-47f0-b8cb-4d2159a52e32",
    "text": "Mantenho minhas promessas",
    "keyed": "plus",
    "domain": "C",
    "facet": 3,
    "num": 15
  },
  {
    "id": "b7fc949b-02b6-4cb9-a3e2-dbb3d824b55f",
    "text": "Trabalho muito",
    "keyed": "plus",
    "domain": "C",
    "facet": 4,
    "num": 20
  },
  {
    "id": "f6076eea-56ae-4b46-97f1-5f94a7676c96",
    "text": "Estou sempre preparado(a)",
    "keyed": "plus",
    "domain": "C",
    "facet": 5,
    "num": 25
  },
  {
    "id": "bd9eec0a-b68b-472c-8803-7db29c308cdb",
    "text": "Mergulho de cabeça nas coisas sem pensar",
    "keyed": "minus",
    "domain": "C",
    "facet": 6,
    "num": 30
  },
  {
    "id": "d50a597f-632b-4f7b-89e6-6d85b50fd1c9",
    "text": "Faço amigos com facilidade",
    "keyed": "plus",
    "domain": "E",
    "facet": 1,
    "num": 2
  },
  {
    "id": "458f3957-2359-4077-ade1-34525d633063",
    "text": "Amo grandes festas",
    "keyed": "plus",
    "domain": "E",
    "facet": 2,
    "num": 7
  },
  {
    "id": "8af754f2-68e9-48f3-8c5d-2e6633d4472c",
    "text": "Assumo a liderança das coisas",
    "keyed": "plus",
    "domain": "E",
    "facet": 3,
    "num": 12
  },
  {
    "id": "48a761ef-438e-409b-ae59-ea2ce8f84414",
    "text": "Estou sempre ocupado(a)",
    "keyed": "plus",
    "domain": "E",
    "facet": 4,
    "num": 17
  },
  {
    "id": "987efee2-899f-4a65-b9b5-1589ef0460d7",
    "text": "Busco sempre emoção (adrenalina)",
    "keyed": "plus",
    "domain": "E",
    "facet": 5,
    "num": 22
  },
  {
    "id": "899c3f66-51d0-46ea-963a-6fc36d3b3cb9",
    "text": "Irradio alegria",
    "keyed": "plus",
    "domain": "E",
    "facet": 6,
    "num": 27
  },
  {
    "id": "ce2fbbf8-7a97-4199-bda5-117e4ecdf3b6",
    "text": "Confio nos outros",
    "keyed": "plus",
    "domain": "A",
    "facet": 1,
    "num": 4
  },
  {
    "id": "0cf79e27-e702-45c2-9471-04ac96b58e0e",
    "text": "Uso os outros para alcançar meus fins",
    "keyed": "minus",
    "domain": "A",
    "facet": 2,
    "num": 9
  },
  {
    "id": "ccf3a5c8-fb50-4bd4-8e7a-22af3d657279",
    "text": "Adoro ajudar aos outros",
    "keyed": "plus",
    "domain": "A",
    "facet": 3,
    "num": 14
  },
  {
    "id": "e2028ad3-b128-4f76-be57-398bfe2aff22",
    "text": "Amo uma boa briga",
    "keyed": "minus",
    "domain": "A",
    "facet": 4,
    "num": 19
  },
  {
    "id": "71029381-3908-4c68-91e1-e41fb45542a2",
    "text": "Acredito ser melhor que os outros",
    "keyed": "minus",
    "domain": "A",
    "facet": 5,
    "num": 24
  },
  {
    "id": "fd50e1ca-d9e0-4037-a7a1-a191d4db2d96",
    "text": "Me preocupo com os desabrigados",
    "keyed": "plus",
    "domain": "A",
    "facet": 6,
    "num": 29
  },
  {
    "id": "43c98ce8-a07a-4dc2-80f6-c1b2a2485f06",
    "text": "Me preocupo com as coisas",
    "keyed": "plus",
    "domain": "N",
    "facet": 1,
    "num": 1
  },
  {
    "id": "48ad12ce-470e-4339-90ac-ea8c43a0103e",
    "text": "Fico com raiva facilmente",
    "keyed": "plus",
    "domain": "N",
    "facet": 2,
    "num": 6
  },
  {
    "id": "5e8550d7-b8ef-4905-950a-f81d735d39e2",
    "text": "Frequentemente me sinto triste",
    "keyed": "plus",
    "domain": "N",
    "facet": 3,
    "num": 11
  },
  {
    "id": "b2d9ef74-73f5-4ea8-b00c-7aaca15937df",
    "text": "Tenho dificuldade de me aproximar dos outros",
    "keyed": "plus",
    "domain": "N",
    "facet": 4,
    "num": 16
  },
  {
    "id": "481efd08-c810-43b1-a952-f8ac9052f96b",
    "text": "Adoro ir em farras",
    "keyed": "plus",
    "domain": "N",
    "facet": 5,
    "num": 21
  },
  {
    "id": "2f519935-92e8-48ad-9746-4a0f8b38466a",
    "text": "Entro em pânico facilmente",
    "keyed": "plus",
    "domain": "N",
    "facet": 6,
    "num": 26
  }
];

export const RAW_TEMPLATES = [
  {
    "domain": "A",
    "title": "Afabilidade",
    "shortDescription": "Pessoas agradáveis aos outros, simpáticos. Se preocupam com a cooperação e a harmonia social e facilmente se dão bem com outras pessoas.",
    "description": "São atenciosos, amigáveis, generosos e se comprometem com os \ninteresses do próximo. Pessoas com esse perfil também têm uma visão otimista \nsobre a humanidade. Eles acreditam que as pessoas são honestas, decentes, \ne confiáveis por natureza. Já os que não se encaixam nesse perfil são \nconsiderados mais individualistas, colocam o interesse próprio acima do \ninteresse alheio e geralmente não se preocupam com o bem-estar dos outros e \nnormalmente não estão dispostos a ajudar. Às vezes, sua desconfiança faz com \nque suspeitem dos outros, sejam hostis e não pensem no cooperativismo.\nA \"afabilidade\" é uma virtude para alcançar e manter popularidade. Pessoas \n\"afáveis\" tendem a conquistar uma admiração sem terem que se esforçar para isso. \nPor outro lado, essa busca por aceitação pode atrapalhar em situações que requerem \ndecisões objetivas e mais complexas, pois a opinião externa e a harmonia entre os \ndemais pesam mais do que seu ponto de vista. Se esforçam demais para que suas \nações agradem a maioria.",
    "results": [
      {
        "score": "low",
        "text": "Sua pontuação para \"afabilidade\" é baixa, indicando que você se\npreocupa mais com as próprias necessidades do que com a dos outros. \nAs pessoas podem te considerar rigoroso, crítico, e inflexível."
      },
      {
        "score": "neutral",
        "text": "Seu nível de \"amabilidade\" é médio, indicando que você se preocupa \ncom as necessidades alheias, mas, dificilmente você se sacrifica para \nfazê-las ou agradar aos outros."
      },
      {
        "score": "high",
        "text": "Seu alto nível de \"afabilidade\" indica um forte interesse em atender \nnecessidades dos outros, promover o bem-estar dos que estão a sua volta \ne o cooperativismo. Você é agradável, simpático, e solidário."
      }
    ],
    "facets": [
      {
        "facet": 1,
        "title": "Confiança",
        "text": "Quem pontua alto para confiança normalmente acredita que a maioria \ndas pessoas são justas, honestas e bem-intencionadas por natureza. Pessoas com \nbaixa pontuação são desconfiados, enxergam os outros como egoístas, \ndesonestos e perigosos."
      },
      {
        "facet": 2,
        "title": "Moralidade",
        "text": "Pessoas que se baseiam na ética e justiça, indivíduo sincero e franco. \nEsse grupo têm facilidade em lidar com outras pessoas e normalmente não gostam de \nmanipulações nas relações. Pontuação baixa caracteriza pessoas que acreditam que \né necessário ou comum que as relações sociais causam decepções."
      },
      {
        "facet": 3,
        "title": "Altruísmo",
        "text": "Se sentem recompensados ao ajudar outras pessoas como forma de \nauto-realização, fortemente movidos pela compaixão e dedicados a promover o \nbem-estar dos outros. Extremamente generoso e disposto a ajudar aqueles que estão \nem necessidade. Pontuação baixa para altruísmo indica pessoas que não se sentem \nbem ajudando necessitados. Ajudar parece mais uma obrigação para eles \ndo que uma ação gratificante."
      },
      {
        "facet": 4,
        "title": "Cooperação",
        "text": "Indivíduos que não gostam de confrontos/agressividade. Preferem \ncomprometer ou negar suas próprias necessidades, se isso resultar em harmonia entre \nos demais. Já os que pontuam pouco são mais propensos a intimidar os outros para \nconseguir o que querem."
      },
      {
        "facet": 5,
        "title": "Modéstia",
        "text": "Pesssoas que falam de realizações próprias com bastante humildade. \nNão gostam de ser considerados superiores ou melhores do que os outros. Em alguns \ncasos essa atitude pode ocasionar baixa autoconfiança/autoestima. Os que têm \npontuação baixa se consideram superiores e podem ser vistos como arrogante \npor outras pessoas."
      },
      {
        "facet": 6,
        "title": "Empatia",
        "text": "Pontuação alta indica capacidade de se pôr no lugar do outro. Sentem a \ndor alheia com compaixão e se preocupam com os demais. O sofrimento humano é algo que \nos afeta fortemente. Os que pontuam baixo nessa competência não se afetam muito pelo \nsofrimento humano. Acreditam na meritocracia e que julgamentos são baseados na razão. \nEstão mais preocupados com a verdade e justiça imparcial do que com a misericórdia/pena."
      }
    ]
  },
  {
    "domain": "E",
    "title": "Extroversão",
    "shortDescription": "A extroversão é marcada pela sociabilidade, engajamento com o mundo externo.",
    "description": "Extrovertidos gostam de estar rodeados de pessoas, são cheios \nde energia, e normalmente seus dias são carregados de emoções positivas. Eles \ntendem a ser animados, orientados para a ação. Provavelmente você vai escutar \ndeles palavras motivadoras, como 'Bora!' e 'Vamos? Vamos!' Quando estão em \ngrupos eles gostam de falar, se destacar e chamar a atenção. Ao contrátio, os \nintrovertidos tendem a ser discretos e mais quietos, gostam de passar o tempo \nsozinhos. Sua falta de envolvimento social não deve ser interpretado como timidez \nou depressão. O introvertido simplesmente precisa de menos estímulo do que um \nextrovertido e prefere sua própria companhia. A independência e reserva do \nintrovertido é às vezes confundido como falta de amizade ou arrogância. \nNa verdade, um introvertido que pontua alto na \"afabilidade\" é o tipo de pessoa \nque não busca ajuda de outros, mas será bastante simpático e solicito quando o chamarem.",
    "results": [
      {
        "score": "low",
        "text": "Sua pontuação para \"extroversão\" é baixa, indicando que \nvocê tende a ser mais introvertido, reservado e tranquilo. Você curte \na solidão e atividades individuais. Ter alguns amigos próximos pra \nvocê já é um grande nível de socialização."
      },
      {
        "score": "neutral",
        "text": "Sua pontuação extroversão é média, indicando que você \nnão é nem super tímido e nem o mais comunicativo do seu grupo. Você \naproveita o tempo com outros, mas também gosta de estar sozinho."
      },
      {
        "score": "high",
        "text": "Sua pontuação para extroversão é alta, indicando que \nvocê é bastante sociável, extrovertido, energético e animado. Você \nprefere estar por perto de pessoas a maior parte do tempo. "
      }
    ],
    "facets": [
      {
        "facet": 1,
        "title": "Simpatia",
        "text": "Pessoas amigáveis, que fazem amigos rapidamente e com \nmuita facilidade. Os que pontuam baixo para simpatia não são \nnecessariamente frios e hostis, são apenas menos comunicativos, mais \ndistantes e reservados."
      },
      {
        "facet": 2,
        "title": "Sociabilidade",
        "text": "Preferência pela companhia dos outros e evita estar \nsozinho. Se sentem bem em multidões/aglomerações. Já os que pontuam \npouco tendem a se sentir tensos em grandes multidões e por isso evitam \naglomerações. Não são antisociais/antipáticos, apenas sentem mais \nnecessidade de privacidade e tempo para si mesmos do que as pessoas \nque têm pontuação alta."
      },
      {
        "facet": 3,
        "title": "Assertividade",
        "text": "Gostam de assumir o comando e direcionar as atividades \ndos outros. Tendem a conquistar cargos de liderança e dominar situações \nsociais. Já as pessoas com pontuação baixa tendem a ser mais quietos e \nnão se incomodam quando os outros comandam as atividades em grupos."
      },
      {
        "facet": 4,
        "title": "Atividade",
        "text": "Pessoas com estilo de vida acelerado e propensos a estarem \nativos. Gostam de estar em movimento e normalmente estão envolvidos em \nmuitas atividades ao mesmo tempo. Pesoas que tem pontuação baixa seguem \num ritmo mais lento e tranquilo, são mais relaxadas."
      },
      {
        "facet": 5,
        "title": "Busca de Sensações",
        "text": "Alegres e estimulados. Têm preferência por barulho. Ficam \nentediados facilmente, adoram luzes brilhantes e movimento. Eles são mais \npropensos a arriscar-se e viver fortes emoções. Os com pontuação baixa não \ngostam de barulho e tumulto e fogem de experiências com fortes emoções."
      },
      {
        "facet": 6,
        "title": "Emoções Positivas",
        "text": "Pessoas alto astral, bem humoradas, lidam com as situações com \nemoções positivas com felicidade, entusiasmo e alegria. As pessoas que \nalcançam uma pontuação baixa não tem um temperamento tão enérgico e alto astral"
      }
    ]
  },
  {
    "domain": "N",
    "title": "Neuroticismo",
    "shortDescription": "Neuroticismo: tendência a sentir emoções negativas.",
    "description": "O termo neurose foi utilizado por Freud para descrever \numa condição marcada por sofrimento mental e emocional, e pela incapacidade \nde lidar com as circunstâncias normais da vida. O pscicanalista defendia \na ideia de que todos os seres humanos mostram alguns sinais de neurose, \nmas que cada indivíduo lida de maneira diferente ao sofrimento e tem sintomas \nespecíficos quando \"em sitações de perigo\". Hoje a psicologia retrata o \nneuroticismo como a tendência à experiência de sentimentos negativos. As pessoas \ndessa personalidade tendem a sentir, dentro desses sentimentos negativos, a \nansiedade, raiva, ou depressão. São pessoas emocionalmente reativas, ou seja, \nrespondem emocionalmente a acontecimentos que não afetariam a maioria das pessoas,\ne suas reações tendem a ser mais intensas do que o normal. Eles interpretam situações \ncomuns como ameaçadoras, e pequenas frustrações são extremamente difíceis de lidar. \nAs reações negativas tendem a persistir por períodos longos de tempo, o que significa \nque eles estão muitas vezes de mau humor. Esses problemas emocionais podem diminuir \na capacidade de pensar com clareza, fazer decisões, e lidar com o estresse.\nIndivíduos que caem na categoria neurótica tendem a ser mais propensos a \nmudanças de humor e a serem reativos.",
    "results": [
      {
        "score": "low",
        "text": "Sua pontuação para \"neuroticismo é baixa, indicando que você é \nbastante calmo, equilibrado e estável. Você não reage com\nemoções intensas em situações difíceis. Em momentos de estresse você tende a ser bastante \ntranquilo e não responde emocionalmente com raiva. Geralmente confiam em sua capacidade \nde lidar com situações adversas ou desconfortáveis."
      },
      {
        "score": "neutral",
        "text": "Sua pontuação para \"neuroticismo\" é média, indicando que seu \nnível de reatividade emocional é típica da população em geral. Situações \nestressantes e frustrantes são um pouco perturbadoras para você, mas você \ngeralmente é capaz de superar esses sentimentos e lidar bem com essas situações."
      },
      {
        "score": "high",
        "text": "Sua pontuação para \"neuroticismo\" é alta, indicando que você tende \na experimentar emoções negativas muito intensamente e têm dificuldade em controlar \nessas emoções quando surgem. As pessoas te consideram sensível e emotivo. Pessoas \ncom essa personalidade são mais vulneráveis à angústia psicológica do que \nos indivíduos que pontuam mais baixo."
      }
    ],
    "facets": [
      {
        "facet": 1,
        "title": "Ansiedade",
        "text": "Tipo de pessoa que está sempre 'em alerta'. Sente ansiedade e que algo \nperigoso está prestes a acontecer. São mais propensos a sentir medo e tensão em \nsituações comuns. Pessoas com baixa pontuação para ansiedade geralmente não têm medo, \nsão calmas e tranquilas."
      },
      {
        "facet": 2,
        "title": "Raiva",
        "text": "As pessoas com alta pontuação nessa categoria se frustram quando as \ncoisas não vão do seu jeito e têm tendência a sentir amargura e raiva. Gostam de ser \ntratados de forma justa e se sentem injustiçados quando enganados. Pessoas com pontuação \nbaixa dificilmente passam raiva."
      },
      {
        "facet": 3,
        "title": "Melancolia",
        "text": "Pontuações altas identificam pessoas que têm dificuldade em iniciar \natividades e propensão maior a experimentar sintomas depressivos, como perda de energia, \ndificuldade de concentração e problemas com o sono. Já as pessoas com pontuação baixa \ntendem a não sentir esses sentimentos depressivos."
      },
      {
        "facet": 4,
        "title": "Autoconsciência",
        "text": "Pessoas com alta autoconsciência tendem a ser tímidas, constrangidas em situações sociais e sensíveis ao que os outros pensam sobre elas. Costumam temer o ridículo ou a rejeição. Já pessoas com baixa pontuação raramente se sentem intimidadas ou deslocadas em público."
      },
      {
        "facet": 5,
        "title": "Impulsividade",
        "text": "Pessoas impulsivas são incapazes de controlar desejos ou impulsos. \nSentem dificuldade em resistir a vontades. Eles tendem a sanar seus prazeres e \nbuscam recompensas instantâneas ao invês de longo-prazo. Já pessoas pouco impulsivas \nnão experimentam necessidades exageradas ou desejos que são impossíveis de resistir, \npor esse motivo costumam ser mais moderados. "
      },
      {
        "facet": 6,
        "title": "Vulnerabilidade",
        "text": "Pessoas que pontuam alto nessa competência têm dificuldade em lidar com \no estresse. Estão mais propensos a passar por situações de pânico, confusão e desamparo \nquando sob pressão. Pessoas com pouca pontuação para vulnerabilidade se sentem mais \nequilibrados, confiantes e pensam com clareza quando passam por momentos de estresse."
      }
    ]
  },
  {
    "domain": "C",
    "title": "Consciência",
    "shortDescription": "Diz respeito à forma como controlamos, conduzimos e direcionamos nossos impulsos.",
    "description": "Consciência gira em torno da ideia de organização e perseverança. \nIndivíduos conscientes normalmente são considerados inteligentes, pois idealizam \nmetas de longo prazo, planejam como vão alcançar seus objetivos e persistem até \nconcluírem, por esse motivo, sua inteligência também está ligada a capacidade de \ncontrolar impulsos. São extremamente capazes de pensar sobre consequências futuras \nantes de agir. Ao invés de ir em busca de recompensas rápidas, o consciente tende \na dedicar-se a grandes projetos, onde é devidamente cauteloso em suas atividades. \nAs pessoas o consideram uma pessoa prudente e sábia. Os benefícios de ser uma pessoa \ndessa categoria é a consciência de seus atos, pois evitam problemas e os ajuda a \nalcançar altos níveis de assertividade e sucesso através de planejamento, propósito \ne persistência. Também são considerados extremamente confiáveis. Porém podem ser \nperfeccionistas, obcecados e 'workaholics'. Em alguns momentos são considerados \nchatos e \"impositores\". Já as pessoas que não estão nessa categoria podem ser criticadas \npor não serem tão confiáveis, terem pouca ou nenhuma ambição e por serem desobedientes. \nAgem sem pensar. Porém, ao agir com espontaneidade e impulsivamente podem ser considerados \ndivertidos e alegres. Vale lembrar que os impulsos não são necessariamente ruins, pois em alguns \ncasos uma decisão rápida pode estar ligada a agilidade e eficácia. No entanto, agir por \nimpulso pode levar a vários problemas e inclusive prejudicar a sociedade. Outro problema \ncom atos impulsivos é que eles muitas vezes produzem recompensas imediatas, mas suas \nconsequências a longo prazo são ruins. O comportamento impulsivo, mesmo quando não é \ntotalmente destrutivo, prejudica a assertividade pois dificulta a assimilação de resolução \nde problemas. Também afeta aos envolvidos em projetos que requerem sequências organizadas \nou são dividiidos em etapas.",
    "results": [
      {
        "score": "low",
        "text": "Sua pontuação em \"Consciência\" é baixa, indicando que você gosta \nde viver o agora e faz as coisas de maneira impulsiva. Seu trabalho tende a ser \ndesorganizado e costumam te avaliar como descuidado."
      },
      {
        "score": "neutral",
        "text": "Sua pontuação em \"Consciência\" é média. Isso significa que você \né razoavelmente organizado e tem auto-controle."
      },
      {
        "score": "high",
        "text": "\"Sua pontuação em Consciência\" é alta. Você é uma pessoa \nque define bem seus objetivos e os realiza com determinação. Te consideram \nconfiável e trabalhador.\""
      }
    ],
    "facets": [
      {
        "facet": 1,
        "title": "Autoeficácia",
        "text": "Quem pontua alto normalmente tem confiança para realizar as coisas. Se \nsente capaz, acredita que têm a inteligência (senso comum) e autocontrole necessários \npara alcançar o sucesso e lidam tranquilamente com os desafios e dificuldades da vida. \nPessoas com pontuação baixa não se sentem eficazes, e podem se sentir perdidos, como se \nnão estivessem no controle de suas vidas."
      },
      {
        "facet": 2,
        "title": "Ordem",
        "text": "Pontuação alta indica clareza e abordagem metódica das tarefas. Essas pessoas \ngostam de viver de acordo com rotinas e horários, costumam criar listas e fazer planejamento. \nOrganização é seu sobrenome. Pessoas com baixa pontuação tendem a ser desorganizadas e dispersas."
      },
      {
        "facet": 3,
        "title": "Senso de Dever",
        "text": "Pessoas conscientes, muito dogmáticas em seus valores. Valorizam o dever e \nobrigação. Têm um forte senso de moral. Pessoas com pontuação baixa consideram regras, \ncontratos e regulamentações exageradas, podendo ser vistos como não confiáveis ou até mesmo \nirresponsáveis."
      },
      {
        "facet": 4,
        "title": "Realização-Esforço",
        "text": "Disposição para trabalhar duro e são motivados por metas (se esforçam para \nalcançar a excelência). Gostam de se sentir reconhecidos e tem objetivos claros na vida. Às \nvezes a busca por perfeição os tornam 'workaholic', obcecados com o trabalho. Pessoas que \npontuam pouco nessa competência se sentem realizados quando cumprem determinada tarefa com \no mínimo de trabalho/esforço, podendo ser visto como preguiçoso."
      },
      {
        "facet": 5,
        "title": "Autodisciplina",
        "text": "Alta capacidade de seguir com as tarefas e limitar a distração. Se mantém a \npersistentes mesmo em tarefas difíceis ou que não gostem de fazer. Não procrastinam para \ncomeçar e finalizar tarefas e são extremamente focadas quando iniciam uma atividade. Aqueles \ncom pouca autodisciplina procrastinam e tem mais dificuldade de 'acompanhar o ritmo'. Muitas \nvezes não conseguem completar tarefas, mesmo as que eles queiram muito finalizar."
      },
      {
        "facet": 6,
        "title": "Cautela",
        "text": "Tendem a refletir cuidadosamente sobre as decisões antes de agir. Pensam nas \npossibilidades e consequências das ações antes de tomar uma decisão. Já os que pontuam baixo \nnormalmente falam/fazem a primeira coisa que vem à mente sem pensar muito nas consequências das \nsuas palavras e ações."
      }
    ]
  },
  {
    "domain": "O",
    "title": "Abertura à Experiência",
    "shortDescription": "Pessoas criativas, apreciadores da arte e da beleza e que gostam do novo.",
    "description": "Abertura à Experiência retrata pessoas intelectualmente curiosas, \napreciadoras da arte e sensíveis à beleza. Eles tendem a ser, em comparação com \npessoas mais fechadas, mais conscientes de seus sentimentos. Tendem a pensar e agir \nde maneira individualista. A abertura à Experiência está ligada ao intelecto, a \npessoas consideradas intelectuais. Outra característica dessa categoria é a facilidade \npara assimilação de símbolos e ao abstrato. Habilidades intelectuais (pensamento matemático, \nlógico ou geométrico, uso artístico e metafórico da linguagem, performance musical e da \narte visual). Pessoas com notas baixas para \"Abertura para Experiência\" tendem a se \ninteressar pelo comum. Eles preferem o simples, direto e óbvio, são conservadores e \nresistentes à mudança. Pessoas nessa categoria, abertas à experiências, são normalmente \nconsideradas mais maduras, que se adaptam com mais facilidade. No entanto, estilos de \npensamento \"abertos e fechados\" são úteis em diferentes ambientes. O estilo intelectual \nda pessoa aberta pode servir bem a um professor, já o indivíduo que não pontua tanto \npara abertura à experiência pode desempenhar melhor no trabalho policial, \nvendas e uma série de outras ocupações.",
    "results": [
      {
        "score": "low",
        "text": "Sua pontuação para \"abertura para experiência\" é baixa, indicando \nque você gosta de pensar em termos simples e claros. Te descrevem como prático e realista."
      },
      {
        "score": "neutral",
        "text": "Sua pontuação para \"abertura para experiência\" é média, indicando que você \ngosta de tradição, mas está disposto a tentar coisas novas. Você costuma pensar de \nmaneira neutra, nem simples nem complicada. Os outros te vêem como uma pessoa educada \nmas não super intelectual."
      },
      {
        "score": "high",
        "text": "Sua pontuação para \"abertura para experiência\" é alta, indicando que você \ngosta de novidades, de variar as atividades, e de mudanças. Você é curioso e criativo."
      }
    ],
    "facets": [
      {
        "facet": 1,
        "title": "Fantasia",
        "text": "Vida mental ativa, critiva e de forte imaginação. Para essas pessoas o \nmundo real é muito comum, normal e rotineiro, por isso estão sempre criando maneiras \nde fantasiar um mundo mais interessante e fabuloso. Quem não tem uma pontuação alta \npara fantasia são mais orientados por fatos do que imaginação."
      },
      {
        "facet": 2,
        "title": "Estética",
        "text": "Forte valorização da arte e da beleza, interesse pela poesia, arte e \nmúsica. Essas pessoas normalmente desenvolvem habilidades artísticas e têm \nsensibilidade a eventos naturais e a estética. Já as pessoas que têm baixa pontuação, \ntem pouca ou nenhuma sensibilidade estética e interesse pela arte."
      },
      {
        "facet": 3,
        "title": "Emotividade",
        "text": "Receptivos e conscientes de seus próprios sentimentos e emoções. \nSentem emoções fortes e tendem a expressá-las abertamente. As pessaos pouco emotivas \ntendem a não expressar suas emoções abertamente."
      },
      {
        "facet": 4,
        "title": "Aventura",
        "text": "Dispostos a explorar novos lugares, experimentar novos alimentos e \ncomeçar novas atividades. Pessoas aventureiras estão sempre em busca do desconhecido, \ngostam de desbravar lugares e não gostam de rotina. É aquela pessoa que gosta de mudar \na cada dia seu caminho de volta para casa. Ao contrário, as pessoas que pontuam pouco \npara aventura se sentem desconfortáveis com mudanças e preferem rotinas familiares."
      },
      {
        "facet": 5,
        "title": "Intelecto",
        "text": "Curioso e cheio de ideias. Interesse por argumentos filosóficos. Pessoas \nabertas para o novo e incomum, gostam de debater questões intelectuais, de decifrar \nenigmas e de desafios para a mente. Normalmente se saem melhores em questões de raciocínio \nrápido e lógica. Já as pessoas com pontuação baixa preferem lidar com pessoas em vez de \nideias. Eles consideram os exercícios intelectuais uma perda de tempo."
      },
      {
        "facet": 6,
        "title": "Liberalismo",
        "text": "Gosta de explorar e avaliar seus próprios valores sociais, políticos e religiosos. \nLiberalismo psicológico refere-se a uma abertura a desafiar autoridade, o convencional e \ntradicional. Demonstra aversão em relação às regras, se questiona com frequência sobre o que \né imposto e aprecia revoluções sociais. Não se importam com estabilidade e segurança, são \ninconformados e entram em conflito com a tradição. Já o contrário, os conservadores psicológicos, \npreferem a segurança e estabilidade. Se sentem bem com o tradicional e normalmente não saem \nda sua zona de conforto."
      }
    ]
  }
];

export function calculateTestResults(
  answersMap: Record<string, number>,
  mode: 'full' | 'short' = 'full'
): BigFiveResult {
  const questionPool = mode === 'full' ? RAW_QUESTIONS : SHORT_QUESTIONS;
  
  const accumulator: Record<DomainKey, {
    score: number;
    count: number;
    result: ScoreLevel;
    facet: Record<string, { score: number; count: number; result: ScoreLevel }>;
  }> = {
    O: { score: 0, count: 0, result: 'neutral', facet: {} },
    C: { score: 0, count: 0, result: 'neutral', facet: {} },
    E: { score: 0, count: 0, result: 'neutral', facet: {} },
    A: { score: 0, count: 0, result: 'neutral', facet: {} },
    N: { score: 0, count: 0, result: 'neutral', facet: {} },
  };

  for (let f = 1; f <= 6; f++) {
    for (const d of ['O', 'C', 'E', 'A', 'N'] as DomainKey[]) {
      accumulator[d].facet[f.toString()] = { score: 0, count: 0, result: 'neutral' };
    }
  }

  let answeredCount = 0;

  for (const q of questionPool) {
    const rawVal = answersMap[q.id];
    if (rawVal !== undefined) {
      answeredCount++;
      const effectiveScore = q.keyed === 'plus' ? rawVal : (6 - rawVal);
      const d = q.domain;
      const f = q.facet.toString();

      accumulator[d].score += effectiveScore;
      accumulator[d].count += 1;

      if (!accumulator[d].facet[f]) {
        accumulator[d].facet[f] = { score: 0, count: 0, result: 'neutral' };
      }
      accumulator[d].facet[f].score += effectiveScore;
      accumulator[d].facet[f].count += 1;
    }
  }

  const getLevel = (score: number, count: number): ScoreLevel => {
    if (count === 0) return 'neutral';
    const avg = score / count;
    if (avg > 3.2) return 'high';
    if (avg < 2.8) return 'low';
    return 'neutral';
  };

  for (const d of ['O', 'C', 'E', 'A', 'N'] as DomainKey[]) {
    accumulator[d].result = getLevel(accumulator[d].score, accumulator[d].count);
    for (let f = 1; f <= 6; f++) {
      const fKey = f.toString();
      const facetData = accumulator[d].facet[fKey];
      facetData.result = getLevel(facetData.score, facetData.count);
    }
  }

  const domainOrder: DomainKey[] = ['O', 'C', 'E', 'A', 'N'];
  
  const domainResults: DomainResult[] = domainOrder.map(domainKey => {
    const domainData = accumulator[domainKey];
    const templateData = RAW_TEMPLATES.find(t => t.domain === domainKey)!;
    
    const resultObj = templateData.results.find(r => r.score === domainData.result) || templateData.results[1];
    
    const maxScore = domainData.count * 5;
    const minScore = domainData.count * 1;
    const percentage = maxScore > minScore 
      ? Math.round(((domainData.score - minScore) / (maxScore - minScore)) * 100)
      : 50;

    const facets: FacetResult[] = templateData.facets.map(f => {
      const fKey = f.facet.toString();
      const fData = domainData.facet[fKey] || { score: 0, count: 0, result: 'neutral' };
      const fMax = fData.count * 5;
      const fMin = fData.count * 1;
      const fPct = fMax > fMin 
        ? Math.round(((fData.score - fMin) / (fMax - fMin)) * 100)
        : 50;

      return {
        facet: f.facet,
        title: f.title,
        text: f.text,
        score: fData.score,
        count: fData.count,
        scoreText: fData.result,
        maxScore: fMax,
        percentage: fPct
      };
    });

    return {
      domain: domainKey,
      title: templateData.title,
      shortDescription: templateData.shortDescription,
      description: templateData.description,
      scoreText: domainData.result,
      score: domainData.score,
      count: domainData.count,
      maxScore,
      percentage,
      text: resultObj.text,
      facets
    };
  });

  return {
    timestamp: new Date().toISOString(),
    mode,
    totalQuestions: questionPool.length,
    answersCount: answeredCount,
    results: domainResults,
    scores: accumulator
  };
}
