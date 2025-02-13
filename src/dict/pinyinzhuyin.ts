// https://github.com/cschiller/zhongwen
let tones = {
    1: '&#772;',
    2: '&#769;',
    3: '&#780;',
    4: '&#768;',
    5: ''
};

let utones = {
    1: '\u0304',
    2: '\u0301',
    3: '\u030C',
    4: '\u0300',
    5: ''
};

function parse(s) {
    return s.match(/([^AEIOU:aeiou]*)([AEIOUaeiou:]+)([^aeiou:]*)([1-5])/);
}

function tonify(vowels, tone) {
    let html = '';
    let text = '';

    if (vowels === 'ou') {
        html = 'o' + tones[tone] + 'u';
        text = 'o' + utones[tone] + 'u';
    } else {
        let tonified = false;
        for (let i = 0; i < vowels.length; i++) {
            let c = vowels.charAt(i);
            html += c;
            text += c;
            if (c === 'a' || c === 'e') {
                html += tones[tone];
                text += utones[tone];
                tonified = true;
            } else if (i === vowels.length - 1 && !tonified) {
                html += tones[tone];
                text += utones[tone];
                tonified = true;
            }
        }
        html = html.replace(/u:/, '&uuml;');
        text = text.replace(/u:/, '\u00FC');
    }

    return [html, text];
}

async function pinyinAndZhuyin(syllables, showToneColors, pinyinClass) {

    let text = '';
    let html = '';
    let zhuyin = '';
    let a = syllables.split(/[\s·]+/);

    let pinyinzhunyin = {
        pinyin: '',
        zhuyin: ''
    }

    for (let i = 0; i < a.length; i++) {
        let syllable = a[i];

        // ',' in pinyin
        if (syllable === ',') {
            html += ' ,';
            text += ' ,';
            continue;
        }

        if (i > 0) {
            html += '&nbsp;';
            text += ' ';
            zhuyin += '&nbsp;';
        }
        if (syllable === 'r5') {
            text += 'r';
            continue;
        }
        if (syllable === 'xx5') {
            text += '??';
            continue;
        }
        let m = parse(syllable);
        let t = tonify(m[2], m[4]);
        html += m[1] + t[0] + m[3];
        text += m[1] + t[1] + m[3];

        zhuyin += numericPinyin2Zhuyin(syllable);
    }
    return [html, text, zhuyin];
}

const zhuyinTones = ['?', '', '\u02CA', '\u02C7', '\u02CB', '\u30FB'];

const pinyinTones = {
    1: '\u0304',
    2: '\u0301',
    3: '\u030C',
    4: '\u0300',
    5: ''
};

const zhuyinMap = {
    'a': '\u311a',
    'ai': '\u311e',
    'an': '\u3122',
    'ang': '\u3124',
    'ao': '\u3120',
    'ba': '\u3105\u311a',
    'bai': '\u3105\u311e',
    'ban': '\u3105\u3122',
    'bang': '\u3105\u3124',
    'bao': '\u3105\u3120',
    'bei': '\u3105\u311f',
    'ben': '\u3105\u3123',
    'beng': '\u3105\u3125',
    'bi': '\u3105\u3127',
    'bian': '\u3105\u3127\u3122',
    'biao': '\u3105\u3127\u3120',
    'bie': '\u3105\u3127\u311d',
    'bin': '\u3105\u3127\u3123',
    'bing': '\u3105\u3127\u3125',
    'bo': '\u3105\u311b',
    'bu': '\u3105\u3128',
    'ca': '\u3118\u311a',
    'cai': '\u3118\u311e',
    'can': '\u3118\u3122',
    'cang': '\u3118\u3124',
    'cao': '\u3118\u3120',
    'ce': '\u3118\u311c',
    'cen': '\u3118\u3123',
    'ceng': '\u3118\u3125',
    'cha': '\u3114\u311a',
    'chai': '\u3114\u311e',
    'chan': '\u3114\u3122',
    'chang': '\u3114\u3124',
    'chao': '\u3114\u3120',
    'che': '\u3114\u311c',
    'chen': '\u3114\u3123',
    'cheng': '\u3114\u3125',
    'chi': '\u3114',
    'chong': '\u3114\u3128\u3125',
    'chou': '\u3114\u3121',
    'chu': '\u3114\u3128',
    'chua': '\u3114\u3128\u311a',
    'chuai': '\u3114\u3128\u311e',
    'chuan': '\u3114\u3128\u3122',
    'chuang': '\u3114\u3128\u3124',
    'chui': '\u3114\u3128\u311f',
    'chun': '\u3114\u3128\u3123',
    'chuo': '\u3114\u3128\u311b',
    'ci': '\u3118',
    'cong': '\u3118\u3128\u3125',
    'cou': '\u3118\u3121',
    'cu': '\u3118\u3128',
    'cuan': '\u3118\u3128\u3122',
    'cui': '\u3118\u3128\u311f',
    'cun': '\u3118\u3128\u3123',
    'cuo': '\u3118\u3128\u311b',
    'da': '\u3109\u311a',
    'dai': '\u3109\u311e',
    'dan': '\u3109\u3122',
    'dang': '\u3109\u3124',
    'dao': '\u3109\u3120',
    'de': '\u3109\u311c',
    'dei': '\u3109\u311f',
    'den': '\u3109\u3123',
    'deng': '\u3109\u3125',
    'di': '\u3109\u3127',
    'dian': '\u3109\u3127\u3122',
    'diang': '\u3109\u3127\u3124',
    'diao': '\u3109\u3127\u3120',
    'die': '\u3109\u3127\u311d',
    'ding': '\u3109\u3127\u3125',
    'diu': '\u3109\u3127\u3121',
    'dong': '\u3109\u3128\u3125',
    'dou': '\u3109\u3121',
    'du': '\u3109\u3128',
    'duan': '\u3109\u3128\u3122',
    'dui': '\u3109\u3128\u311f',
    'dun': '\u3109\u3128\u3123',
    'duo': '\u3109\u3128\u311b',
    'e': '\u311c',
    'ei': '\u311f',
    'en': '\u3123',
    'er': '\u3126',
    'fa': '\u3108\u311a',
    'fan': '\u3108\u3122',
    'fang': '\u3108\u3124',
    'fei': '\u3108\u311f',
    'fen': '\u3108\u3123',
    'feng': '\u3108\u3125',
    'fo': '\u3108\u311b',
    'fou': '\u3108\u3121',
    'fu': '\u3108\u3128',
    'ga': '\u310d\u311a',
    'gai': '\u310d\u311e',
    'gan': '\u310d\u3122',
    'gang': '\u310d\u3124',
    'gao': '\u310d\u3120',
    'ge': '\u310d\u311c',
    'gei': '\u310d\u311f',
    'gen': '\u310d\u3123',
    'geng': '\u310d\u3125',
    'gong': '\u310d\u3128\u3125',
    'gou': '\u310d\u3121',
    'gu': '\u310d\u3128',
    'gua': '\u310d\u3128\u311a',
    'guai': '\u310d\u3128\u311e',
    'guan': '\u310d\u3128\u3122',
    'guang': '\u310d\u3128\u3124',
    'gui': '\u310d\u3128\u311f',
    'gun': '\u310d\u3128\u3123',
    'guo': '\u310d\u3128\u311b',
    'ha': '\u310f\u311a',
    'hai': '\u310f\u311e',
    'han': '\u310f\u3122',
    'hang': '\u310f\u3124',
    'hao': '\u310f\u3120',
    'he': '\u310f\u311c',
    'hei': '\u310f\u311f',
    'hen': '\u310f\u3123',
    'heng': '\u310f\u3125',
    'hong': '\u310f\u3128\u3125',
    'hou': '\u310f\u3121',
    'hu': '\u310f\u3128',
    'hua': '\u310f\u3128\u311a',
    'huai': '\u310f\u3128\u311e',
    'huan': '\u310f\u3128\u3122',
    'huang': '\u310f\u3128\u3124',
    'hui': '\u310f\u3128\u311f',
    'hun': '\u310f\u3128\u3123',
    'huo': '\u310f\u3128\u311b',
    'ji': '\u3110\u3127',
    'jia': '\u3110\u3127\u311a',
    'jian': '\u3110\u3127\u3122',
    'jiang': '\u3110\u3127\u3124',
    'jiao': '\u3110\u3127\u3120',
    'jie': '\u3110\u3127\u311d',
    'jin': '\u3110\u3127\u3123',
    'jing': '\u3110\u3127\u3125',
    'jiong': '\u3110\u3129\u3125',
    'jiu': '\u3110\u3127\u3121',
    'ju': '\u3110\u3129',
    'juan': '\u3110\u3129\u3122',
    'jue': '\u3110\u3129\u311d',
    'jun': '\u3110\u3129\u3123',
    'ka': '\u310e\u311a',
    'kai': '\u310e\u311e',
    'kan': '\u310e\u3122',
    'kang': '\u310e\u3124',
    'kao': '\u310e\u3120',
    'ke': '\u310e\u311c',
    'ken': '\u310e\u3123',
    'keng': '\u310e\u3125',
    'kong': '\u310e\u3128\u3125',
    'kou': '\u310e\u3121',
    'ku': '\u310e\u3128',
    'kua': '\u310e\u3128\u311a',
    'kuai': '\u310e\u3128\u311e',
    'kuan': '\u310e\u3128\u3122',
    'kuang': '\u310e\u3128\u3124',
    'kui': '\u310e\u3128\u311f',
    'kun': '\u310e\u3128\u3123',
    'kuo': '\u310e\u3128\u311b',
    'la': '\u310c\u311a',
    'lai': '\u310c\u311e',
    'lan': '\u310c\u3122',
    'lang': '\u310c\u3124',
    'lao': '\u310c\u3120',
    'le': '\u310c\u311c',
    'lei': '\u310c\u311f',
    'leng': '\u310c\u3125',
    'li': '\u310c\u3127',
    'lia': '\u310c\u3127\u311a',
    'lian': '\u310c\u3127\u3122',
    'liang': '\u310c\u3127\u3124',
    'liao': '\u310c\u3127\u3120',
    'lie': '\u310c\u3127\u311d',
    'lin': '\u310c\u3127\u3123',
    'ling': '\u310c\u3127\u3125',
    'liu': '\u310c\u3127\u3121',
    'lo': '\u310c\u311b',
    'long': '\u310c\u3128\u3125',
    'lou': '\u310c\u3121',
    'lu': '\u310c\u3128',
    'lu:': '\u310c\u3129',
    'luan': '\u310c\u3128\u3123',
    'lu:e': '\u310c\u3129\u311d',
    'lun': '\u310c\u3129',
    'lu:n': '\u310c\u3129\u3123',
    'luo': '\u310c\u3129\u3123',
    'ma': '\u3107\u311a',
    'mai': '\u3107\u311e',
    'man': '\u3107\u3122',
    'mang': '\u3107\u3124',
    'mao': '\u3107\u3120',
    'me': '\u3107\u311c',
    'mei': '\u3107\u311f',
    'men': '\u3107\u3123',
    'meng': '\u3107\u3125',
    'mi': '\u3107\u3127',
    'mian': '\u3107\u3127\u3122',
    'miao': '\u3107\u3127\u3120',
    'mie': '\u3107\u3127\u311d',
    'min': '\u3107\u3127\u3123',
    'ming': '\u3107\u3127\u3125',
    'miu': '\u3107\u3127\u3121',
    'mo': '\u3107\u311b',
    'mou': '\u3107\u3121',
    'mu': '\u3107\u3128',
    'na': '\u310b\u311a',
    'nai': '\u310b\u311e',
    'nan': '\u310b\u3122',
    'nang': '\u310b\u3124',
    'nao': '\u310b\u3120',
    'ne': '\u310b\u311c',
    'nei': '\u310b\u311f',
    'nen': '\u310b\u3123',
    'neng': '\u310b\u3125',
    'ni': '\u310b\u3127',
    'nia': '\u310b\u3127\u311a',
    'nian': '\u310b\u3127\u3122',
    'niang': '\u310b\u3127\u3124',
    'niao': '\u310b\u3127\u3120',
    'nie': '\u310b\u3127\u311d',
    'nin': '\u310b\u3127\u3123',
    'ning': '\u310b\u3127\u3125',
    'niu': '\u310b\u3127\u3121',
    'nong': '\u310b\u3128\u3125',
    'nou': '\u310b\u3121',
    'nu': '\u310b\u3128',
    'nu:': '\u310b\u3129',
    'nuan': '\u310b\u3128\u3123',
    'nu:e': '\u310b\u3129\u311d',
    'nun': '\u310b\u3129',
    'nuo': '\u310b\u3129\u311d',
    'ou': '\u3121',
    'pa': '\u3106\u311a',
    'pai': '\u3106\u311e',
    'pan': '\u3106\u3122',
    'pang': '\u3106\u3124',
    'pao': '\u3106\u3120',
    'pei': '\u3106\u311f',
    'pen': '\u3106\u3123',
    'peng': '\u3106\u3125',
    'pi': '\u3106\u3127',
    'pian': '\u3106\u3127\u3122',
    'piao': '\u3106\u3127\u3120',
    'pie': '\u3106\u3127\u311d',
    'pin': '\u3106\u3127\u3123',
    'ping': '\u3106\u3127\u3125',
    'po': '\u3106\u311b',
    'pou': '\u3106\u3121',
    'pu': '\u3106\u3128',
    'qi': '\u3111\u3127',
    'qia': '\u3111\u3127\u311a',
    'qian': '\u3111\u3127\u3122',
    'qiang': '\u3111\u3127\u3124',
    'qiao': '\u3111\u3127\u3120',
    'qie': '\u3111\u3127\u311d',
    'qin': '\u3111\u3127\u3123',
    'qing': '\u3111\u3127\u3125',
    'qiong': '\u3111\u3129\u3125',
    'qiu': '\u3111\u3127\u3121',
    'qu': '\u3111\u3129',
    'quan': '\u3111\u3129\u3122',
    'que': '\u3111\u3129\u311d',
    'qun': '\u3111\u3129\u3123',
    'ran': '\u3116\u3122',
    'rang': '\u3116\u3124',
    'rao': '\u3116\u3120',
    're': '\u3116\u311c',
    'ren': '\u3116\u3123',
    'reng': '\u3116\u3125',
    'ri': '\u3116',
    'rong': '\u3116\u3128\u3125',
    'rou': '\u3116\u3121',
    'ru': '\u3116\u3128',
    'ruan': '\u3116\u3128\u3122',
    'rui': '\u3116\u3128\u311f',
    'run': '\u3116\u3128\u3123',
    'ruo': '\u3116\u3128\u311b',
    'sa': '\u3119\u311a',
    'sai': '\u3119\u311e',
    'san': '\u3119\u3122',
    'sang': '\u3119\u3124',
    'sao': '\u3119\u3120',
    'se': '\u3119\u311c',
    'sei': '\u3119\u311f',
    'sen': '\u3119\u3123',
    'seng': '\u3119\u3125',
    'sha': '\u3115\u311a',
    'shai': '\u3115\u311e',
    'shan': '\u3115\u3122',
    'shang': '\u3115\u3124',
    'shao': '\u3115\u3120',
    'she': '\u3115\u311c',
    'shei': '\u3115\u311f',
    'shen': '\u3115\u3123',
    'sheng': '\u3115\u3125',
    'shi': '\u3115',
    'shong': '\u3115\u3128\u3125',
    'shou': '\u3115\u3121',
    'shu': '\u3115\u3128',
    'shua': '\u3115\u3128\u311a',
    'shuai': '\u3115\u3128\u311e',
    'shuan': '\u3115\u3128\u3122',
    'shuang': '\u3115\u3128\u3124',
    'shui': '\u3115\u3128\u311f',
    'shun': '\u3115\u3128\u3123',
    'shuo': '\u3115\u3128\u311b',
    'si': '\u3119',
    'song': '\u3119\u3128\u3125',
    'sou': '\u3119\u3121',
    'su': '\u3119\u3128',
    'suan': '\u3119\u3128\u3122',
    'sui': '\u3119\u3128\u311f',
    'sun': '\u3119\u3128\u3123',
    'suo': '\u3119\u3128\u311b',
    'ta': '\u310a\u311a',
    'tai': '\u310a\u311e',
    'tan': '\u310a\u3122',
    'tang': '\u310a\u3124',
    'tao': '\u310a\u3120',
    'te': '\u310a\u311c',
    'teng': '\u310a\u3125',
    'ti': '\u310a\u3127',
    'tian': '\u310a\u3127\u3122',
    'tiao': '\u310a\u3127\u3120',
    'tie': '\u310a\u3127\u311d',
    'ting': '\u310a\u3127\u3125',
    'tong': '\u310a\u3128\u3125',
    'tou': '\u310a\u3121',
    'tu': '\u310a\u3128',
    'tuan': '\u310a\u3128\u3122',
    'tui': '\u310a\u3128\u311f',
    'tun': '\u310a\u3128\u3123',
    'tuo': '\u310a\u3128\u311b',
    'wa': '\u3128\u311a',
    'wai': '\u3128\u311e',
    'wan': '\u3128\u3122',
    'wang': '\u3128\u3124',
    'wei': '\u3128\u311f',
    'wen': '\u3128\u3123',
    'weng': '\u3128\u3125',
    'wo': '\u3128\u311b',
    'wu': '\u3128',
    'xi': '\u3112\u3127',
    'xia': '\u3112\u3127\u311a',
    'xian': '\u3112\u3127\u3122',
    'xiang': '\u3112\u3127\u3124',
    'xiao': '\u3112\u3127\u3120',
    'xie': '\u3112\u3127\u311d',
    'xin': '\u3112\u3127\u3123',
    'xing': '\u3112\u3127\u3125',
    'xiong': '\u3112\u3129\u3125',
    'xiu': '\u3112\u3127\u3121',
    'xu': '\u3112\u3129',
    'xuan': '\u3112\u3129\u3122',
    'xue': '\u3112\u3129\u311d',
    'xun': '\u3112\u3129\u3123',
    'ya': '\u3127\u311a',
    'yan': '\u3127\u3122',
    'yang': '\u3127\u3124',
    'yao': '\u3127\u3120',
    'ye': '\u3127\u311d',
    'yi': '\u3127',
    'yin': '\u3127\u3123',
    'ying': '\u3127\u3125',
    'yong': '\u3129\u3125',
    'you': '\u3127\u3121',
    'yu': '\u3129',
    'yuan': '\u3129\u3122',
    'yue': '\u3129\u311d',
    'yun': '\u3129\u3123',
    'za': '\u3117\u311a',
    'zai': '\u3117\u311e',
    'zan': '\u3117\u3122',
    'zang': '\u3117\u3124',
    'zao': '\u3117\u3120',
    'ze': '\u3117\u311c',
    'zei': '\u3117\u311f',
    'zen': '\u3117\u3123',
    'zeng': '\u3117\u3125',
    'zha': '\u3113\u311a',
    'zhai': '\u3113\u311e',
    'zhan': '\u3113\u3122',
    'zhang': '\u3113\u3124',
    'zhao': '\u3113\u3120',
    'zhe': '\u3113\u311c',
    'zhei': '\u3113\u311f',
    'zhen': '\u3113\u3123',
    'zheng': '\u3113\u3125',
    'zhi': '\u3113',
    'zhong': '\u3113\u3128\u3125',
    'zhou': '\u3113\u3121',
    'zhu': '\u3113\u3128',
    'zhua': '\u3113\u3128\u311a',
    'zhuai': '\u3113\u3128\u311e',
    'zhuan': '\u3113\u3128\u3122',
    'zhuang': '\u3113\u3128\u3124',
    'zhui': '\u3113\u3128\u311f',
    'zhun': '\u3113\u3128\u3123',
    'zhuo': '\u3113\u3128\u311b',
    'zi': '\u3117',
    'zong': '\u3117\u3128\u3125',
    'zou': '\u3117\u3121',
    'zu': '\u3117\u3128',
    'zuan': '\u3117\u3128\u3122',
    'zui': '\u3117\u3128\u311f',
    'zun': '\u3117\u3128\u3123',
    'zuo': '\u3117\u3128\u311b'
};

const numericPinyin2Zhuyin = (syllable) => {
    return zhuyinMap[syllable.substring(0, syllable.length - 1).toLowerCase()]
        + zhuyinTones[syllable[syllable.length - 1]];
};

const accentedPinyin2Zhuyin = (syllable) => {
    let lowerCased = syllable.toLowerCase();
    let key = lowerCased;
    let tone = 5;
    for (let i = 1; i <= 4; i++) {
        let idx = lowerCased.indexOf(pinyinTones[i]);
        if (idx > 0) {
            key = lowerCased.substring(0, idx);
            if (idx < lowerCased.length - 1) {
                key += lowerCased.substring(idx + 1);
            }
            tone = i;
            break;
        }
    }
    return zhuyinMap[key] + zhuyinTones[tone];
};

export default pinyinAndZhuyin;
