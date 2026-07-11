import { Shayari, MoodConfig } from '../types';

export const MOODS: MoodConfig[] = [
  {
    category: 'love',
    label: 'Love & Romance',
    hindiLabel: 'इश्क़-मोहब्बत',
    emoji: '💖',
    gradient: 'from-rose-950 via-pink-950 to-neutral-950',
    ambientColor: 'pink',
    description: 'Beautiful verses that touch the heart and express the deep warmth of love.',
  },
  {
    category: 'sad',
    label: 'Sad & Broken Heart',
    hindiLabel: 'दर्द-ओ-ग़म',
    emoji: '💔',
    gradient: 'from-blue-950 via-indigo-950 to-neutral-950',
    ambientColor: 'indigo',
    description: 'Melancholic lines speaking to the pain of separation, longing, and heartbreak.',
  },
  {
    category: 'attitude',
    label: 'Attitude & Pride',
    hindiLabel: 'तेवर और एटीट्यूड',
    emoji: '😎',
    gradient: 'from-amber-950 via-orange-950 to-neutral-950',
    ambientColor: 'amber',
    description: 'Bold, confident, and fiery couplets celebrating self-respect, stance, and pride.',
  },
  {
    category: 'friendship',
    label: 'Friendship (Dosti)',
    hindiLabel: 'यारी-दोस्ती',
    emoji: '🤗',
    gradient: 'from-teal-950 via-emerald-950 to-neutral-950',
    ambientColor: 'teal',
    description: 'Warm and loyal verses celebrating companionship, trust, and lifelong bond of friendship.',
  },
  {
    category: 'life',
    label: 'Life & Philosophy',
    hindiLabel: 'ज़िंदगी और फलसफा',
    emoji: '🍃',
    gradient: 'from-purple-950 via-fuchsia-950 to-neutral-950',
    ambientColor: 'purple',
    description: 'Deep philosophical reflections on the journey of life, destiny, and human nature.',
  },
  {
    category: 'inspiration',
    label: 'Inspiration & Hope',
    hindiLabel: 'उम्मीद और हौसला',
    emoji: '✨',
    gradient: 'from-cyan-950 via-sky-950 to-neutral-950',
    ambientColor: 'cyan',
    description: 'Motivational verses meant to ignite passion, inner strength, and relentless hope.',
  },
];

export const SEED_SHAYARIS: Shayari[] = [
  // --- LOVE ---
  {
    id: 'love-1',
    hindi: 'हज़ारों ख्वाहिशें ऐसी कि हर ख्वाहिश पे दम निकले,\nबहुत निकले मेरे अरमान लेकिन फिर भी कम निकले।',
    englishTranslit: 'Hazaaron khwaahishein aisi ki har khwaahish pe dam nikle,\nBahut nikle mere armaan lekin phir bhi kam nikle.',
    translation: 'Thousands of desires, each worth dying for...\nMany of my longings were fulfilled, yet I yearn for more.',
    meaning: 'This classic by Mirza Ghalib expresses the infinite nature of human desire and love, where no matter how many longings are satisfied, the heart still craves more.',
    category: 'love',
    author: 'Mirza Ghalib',
  },
  {
    id: 'love-2',
    hindi: 'तुम्हारी महफ़िल में आए हैं तो कोई वजह होगी,\nइशारा तुम्हारी आँखों का था, कोई खता हमारी नहीं।',
    englishTranslit: 'Tumhari mehfil mein aaye hain to koi wajah hogi,\nIshaara tumhari aankhon ka tha, koi khata hamari nahi.',
    translation: 'There must be a reason I have come to your gathering...\nIt was the unspoken invitation of your eyes; I am not to blame.',
    meaning: 'A romantic couplet showing how the lover was drawn in solely by the captivating glance of the beloved.',
    category: 'love',
    author: 'Classic',
  },
  {
    id: 'love-3',
    hindi: 'तुम मिलो या न मिलो ये तो मुक़द्दर की बात है,\nपर सुकून बहुत मिलता है तुम्हें अपना सोच कर।',
    englishTranslit: 'Tum milo ya na milo ye toh muqaddar ki baat hai,\nPar sukoon bahut milta hai tumhein apna soch kar.',
    translation: 'Whether we meet or not is a matter of destiny,\nBut there is immense peace just in thinking of you as mine.',
    meaning: 'Unconditional love, where the mere thought of the beloved brings serene peace, regardless of physical togetherness.',
    category: 'love',
    author: 'Unknown',
  },

  // --- SAD ---
  {
    id: 'sad-1',
    hindi: 'दुख इस बात का नहीं कि तुम बदल गए,\nअफ़सोस तो इस बात का है कि हम भरोसा कर बैठे।',
    englishTranslit: 'Dukh is baat ka nahi ki tum badal gaye,\nAfsoos toh is baat ka hai ki hum bharosa kar baithe.',
    translation: 'The grief is not that you changed...\nThe regret is that I trusted you so completely.',
    meaning: 'Reflects on the sorrow of betrayal, emphasizing that the heartbreak lies not in the other person changing, but in one’s own vulnerability in trusting them.',
    category: 'sad',
    author: 'Classic',
  },
  {
    id: 'sad-2',
    hindi: 'उम्र भर गालिब यही भूल करता रहा,\nधूल चेहरे पर थी, और आईना साफ़ करता रहा।',
    englishTranslit: 'Umr bhar Ghalib yahi bhool karta raha,\nDhool chehre par thi, aur aaina saaf karta raha.',
    translation: 'All his life Ghalib kept making the same mistake,\nThe dust was on his own face, yet he kept cleaning the mirror.',
    meaning: 'Often attributed to Ghalib, this represents self-ignorance: looking for faults in others or the external world when the true issue lies within oneself.',
    category: 'sad',
    author: 'Popularly attributed to Ghalib',
  },
  {
    id: 'sad-3',
    hindi: 'दिल से रोए मगर होठों से मुस्कुरा बैठे,\nयूँ ही हम अपनों से अपना रिश्ता निभा बैठे।',
    englishTranslit: 'Dil se roye magar hothon se muskura baithe,\nYun hi hum apnon se apna rishta nibha baithe.',
    translation: 'The heart wept, but the lips smiled anyway...\nAnd thus, we kept upholding relationships with our loved ones.',
    meaning: 'Expresses the silent sacrifice of concealing one\'s own pain behind a smile just to preserve the peace and happiness of family and loved ones.',
    category: 'sad',
    author: 'Classic',
  },

  // --- ATTITUDE ---
  {
    id: 'attitude-1',
    hindi: 'मुझसे जलने वाले भी कमाल करते हैं,\nमहफ़िल खुद की होती है और चर्चे मेरे करते हैं।',
    englishTranslit: 'Mujhse jalne wale bhi kamaal karte hain,\nMehfil khud ki hoti hai aur charche mere karte hain.',
    translation: 'Those who are jealous of me are quite amusing...\nThe gathering is theirs, but they only talk about me.',
    meaning: 'A high-attitude verse asserting dominance and confidence, noting how rivals cannot help but focus their attention on you.',
    category: 'attitude',
    author: 'Modern',
  },
  {
    id: 'attitude-2',
    hindi: 'हमारा अंदाज़ कुछ ऐसा है कि जब हम बोलते हैं तो बरस जाते हैं,\nऔर जब खामोश रहते हैं तो लोग तरस जाते हैं।',
    englishTranslit: 'Hamara andaaz kuch aisa hai ki jab hum bolte hain toh baras jaate hain,\nAur jab khamosh rehte hain toh log taras jaate hain.',
    translation: 'Our style is such that when we speak, we pour like rain...\nAnd when we are silent, people long to hear us speak.',
    meaning: 'Speaks to the majestic authority of one\'s presence, where silence and speech both hold immense, captivating value.',
    category: 'attitude',
    author: 'Classic',
  },

  // --- FRIENDSHIP ---
  {
    id: 'friendship-1',
    hindi: 'गुनाह करके सज़ा से डरते हैं,\nज़हर पीकर दवा से डरते हैं।\nदुश्मनों के सितम का खौफ नहीं,\nहम तो दोस्तों के खफा होने से डरते हैं।',
    englishTranslit: 'Gunaah karke saza se darte hain,\nZehar peekar dawa se darte hain.\nDushmano ke sitam ka khauf nahi,\nHum toh doston ke khafa hone se darte hain.',
    translation: 'People sin and fear the punishment, or drink poison and fear the cure...\nI have no fear of the cruelty of enemies, I only fear my friends getting upset with me.',
    meaning: 'Beautifully details how precious friendship is, stating that the anger or distance of a close friend is more painful than any external threat.',
    category: 'friendship',
    author: 'Unknown',
  },
  {
    id: 'friendship-2',
    hindi: 'सच्चा दोस्त वही होता है जो तब भी साथ दे,\nजब पूरी दुनिया आपका साथ छोड़ चुकी हो।',
    englishTranslit: 'Saccha dost wahi hota hai jo tab bhi saath de,\nJab poori duniya aapka saath chhod chuki ho.',
    translation: 'A true friend is the one who stands by your side...\nEven when the rest of the world has walked away.',
    meaning: 'Emphasizes the unwavering reliability and support of genuine friends during adversity.',
    category: 'friendship',
    author: 'Popular',
  },

  // --- LIFE ---
  {
    id: 'life-1',
    hindi: 'सफ़र में धूप तो होगी जो चल सको तो चलो,\nसभी हैं भीड़ में तुम भी निकल सको तो चलो।',
    englishTranslit: 'Safar mein dhoop toh hogi jo chal sako toh chalo,\nSabhi hain bheed mein tum bhi nikal sako toh chalo.',
    translation: 'The journey will have scorching heat; if you can walk, then come...\nEveryone is part of the crowd; if you can break free, then come.',
    meaning: 'Nida Fazli\'s masterpiece about the inevitable hardships of life\'s journey. It challenges the individual to face difficulties and carve their own identity instead of just following the crowd.',
    category: 'life',
    author: 'Nida Fazli',
  },
  {
    id: 'life-2',
    hindi: 'ज़िंदगी की हकीकत को बस इतना ही जाना है,\nदर्द में अकेले हैं और खुशियों में सारा जमाना है।',
    englishTranslit: 'Zindagi ki haqeeqat ko bas itna hi jaana hai,\nDard mein akele hain aur khushiyon mein sara zamana hai.',
    translation: 'I have realized only this truth about life:\nWe are completely alone in pain, but the whole world joins in our joy.',
    meaning: 'A poignant realization about human nature and society—how grief is a lonely, personal battle, while prosperity and happiness attract plenty of companions.',
    category: 'life',
    author: 'Classic',
  },

  // --- INSPIRATION ---
  {
    id: 'inspiration-1',
    hindi: 'लहरों से डरकर नौका पार नहीं होती,\nकोशिश करने वालों की कभी हार नहीं होती।',
    englishTranslit: 'Lehron se darkar nauka paar nahi hoti,\nKoshish karne walon ki kabhi haar nahi hoti.',
    translation: 'Fearing the waves, the boat can never cross the sea...\nThose who keep trying will never face defeat.',
    meaning: 'Written by Sohan Lal Dwivedi (often attributed to Harivansh Rai Bachchan), this extremely motivational verse teaches courage, resilience, and the ultimate victory of persistent effort.',
    category: 'inspiration',
    author: 'Sohan Lal Dwivedi',
  },
  {
    id: 'inspiration-2',
    hindi: 'खुद को कर बुलंद इतना कि हर तकदीर से पहले,\nखुदा बंदे से खुद पूछे बता तेरी रज़ा क्या है।',
    englishTranslit: 'Khudi ko kar buland itna ki har takdeer se pehle,\nKhuda bande se khud pooche bata teri raza kya hai.',
    translation: 'Elevate your selfhood to such heights that before writing your destiny,\nGod Himself shall ask you: "Tell Me, what is your desire?"',
    meaning: 'Allama Iqbal\'s legendary couplet about self-mastery, asserting that through sheer willpower and spiritual excellence, one can direct their own fate.',
    category: 'inspiration',
    author: 'Allama Iqbal',
  }
];
