/* Spelling mnemonics are visual cues, never pronunciation rules. */
const memoryStories={...additionalMemoryStories};
const contextualMemoryStories={
  "chicken": {
    "3": {
      "anchor": "ck",
      "image": "assets/stories/mnemonic-213148745c3b.webp",
      "visual": "Gà mái nâu bên hai chữ c và k có hạt thóc.",
      "text": "Gà mái nhặt hai hạt chữ c rồi k. Nhớ viết c trước k trong chicken.",
      "cue": "Trên đĩa gà: c đứng trước k, thành ck.",
      "imageVerified": true
    },
    "8": {
      "anchor": "ck",
      "image": "assets/stories/mnemonic-5a9ca3db0732.webp",
      "visual": "Đĩa thịt gà có hai chiếc nĩa chữ c và k đặt sát nhau. Con xếp c trước k khi viết chicken nhé.",
      "text": "Đĩa thịt gà có hai chiếc nĩa chữ c và k đặt sát nhau. Bạn xếp c trước k khi viết chicken nhé.",
      "cue": "Trên đĩa gà: c đứng trước k, thành ck.",
      "imageVerified": true
    }
  },
  "fish": {
    "3": {
      "anchor": "sh",
      "image": "assets/stories/mnemonic-f856ce8f1c7c.webp",
      "visual": "Cá sống bơi qua rong chữ s và cổng chữ h dưới nước.",
      "text": "Cá bơi qua rong s rồi cổng h. Cuối fish nhớ s rồi h.",
      "cue": "Hai đầu bếp s rồi h đứng cuối fish.",
      "imageVerified": true
    },
    "9": {
      "anchor": "sh",
      "image": "assets/stories/mnemonic-7d16b43b09f1.webp",
      "visual": "Hai đầu bếp chữ s và h mang đĩa cá nướng.",
      "text": "Hai đầu bếp s và h cùng mang đĩa cá. Cuối fish có s rồi h.",
      "cue": "Hai đầu bếp s rồi h đứng cuối fish.",
      "imageVerified": true
    }
  },
  "mouse": {
    "4": {
      "anchor": "ou",
      "image": "assets/stories/mnemonic-07f49ddf2f08.webp",
      "visual": "Chuột xám chui qua vòng o, hướng tới chiếc cốc hình u.",
      "text": "Chuột nhỏ chui qua vòng o rồi vào chiếc cốc u. Giữa mouse có o trước u.",
      "cue": "Chuột máy tính kéo o tới u: ou.",
      "imageVerified": true
    },
    "19": {
      "anchor": "ou",
      "image": "assets/stories/mnemonic-aa3b46b5a244.webp",
      "visual": "Chuột máy tính kéo vòng dây o vào chiếc khay u. Trong mouse, o đứng ngay trước u.",
      "text": "Chuột máy tính đẩy vòng o vào khay có chữ u. Trong mouse, o đứng ngay trước u.",
      "cue": "Chuột máy tính kéo o tới u: ou.",
      "imageVerified": true
    }
  },
  "watch": {
    "11": {
      "anchor": "tch",
      "image": "assets/stories/mnemonic-1268b75570dd.webp",
      "visual": "Ba mắt khóa khắc t,c,h đúng, gắn dây đồng hồ; watch đúng.",
      "text": "Đồng hồ đeo tay có ba móc khóa t, c, h. Con cài lần lượt t rồi c rồi h ở cuối watch.",
      "cue": "Khóa đồng hồ xếp t, c, h: tch.",
      "imageVerified": true
    },
    "27": {
      "anchor": "tch",
      "image": "assets/stories/mnemonic-1268b75570dd.webp",
      "visual": "Ba mắt khóa khắc t,c,h đúng, gắn dây đồng hồ; watch đúng.",
      "text": "Đồng hồ đeo tay có ba móc khóa t, c, h. Con cài lần lượt t rồi c rồi h ở cuối watch.",
      "cue": "Khóa đồng hồ xếp t, c, h: tch.",
      "imageVerified": true
    },
    "16": {
      "anchor": "tch",
      "image": "assets/stories/mnemonic-ea0add4d0932.webp",
      "visual": "Ba nhân vật t, c, h cùng ngồi xem ti vi.",
      "text": "Ba bạn t, c, h cùng xem ti vi. Cuối watch cũng là t rồi c rồi h.",
      "cue": "Khóa đồng hồ xếp t, c, h: tch.",
      "imageVerified": true
    },
    "26": {
      "anchor": "tch",
      "image": "assets/stories/mnemonic-ea0add4d0932.webp",
      "visual": "Ba nhân vật t, c, h cùng ngồi xem ti vi.",
      "text": "Ba bạn t, c, h cùng xem ti vi. Cuối watch cũng là t rồi c rồi h.",
      "cue": "Khóa đồng hồ xếp t, c, h: tch.",
      "imageVerified": true
    }
  },
  "painting": {
    "16": {
      "anchor": "ing",
      "image": "assets/stories/mnemonic-012f02faf707.webp",
      "visual": "Tranh hoàn thiện trêngiá có cọ i,đồi n,đường g vàhũ i n g;painting đúng.",
      "text": "Bức tranh trên giá có cọ i, đồi n và lối đi cong g. Ba hũ màu i, n, g nhắc phần cuối painting.",
      "cue": "Painting kết thúc bằng i, n, g.",
      "imageVerified": true
    },
    "19": {
      "anchor": "ing",
      "image": "assets/stories/mnemonic-012f02faf707.webp",
      "visual": "Tranh hoàn thiện trêngiá có cọ i,đồi n,đường g vàhũ i n g;painting đúng.",
      "text": "Bức tranh trên giá có cọ i, đồi n và lối đi cong g. Ba hũ màu i, n, g nhắc phần cuối painting.",
      "cue": "Painting kết thúc bằng i, n, g.",
      "imageVerified": true
    },
    "25": {
      "anchor": "ing",
      "image": "assets/stories/mnemonic-b12514eb3aa1.webp",
      "visual": "Bé vẽ hoa, trước mặt có ba lọ màu ghi i, n, g.",
      "text": "Bé vẽ hoa bên ba lọ màu i, n, g. Cuối painting nhớ đủ i rồi n rồi g.",
      "cue": "Painting kết thúc bằng i, n, g.",
      "imageVerified": true
    }
  },
  "clean": {
    "30": {
      "anchor": "ea",
      "image": "assets/stories/mnemonic-9c890fa3d1cf.webp",
      "visual": "Hai bé mặc áo e và a cùng quét sàn bằng chổi và hót rác.",
      "text": "Hai bạn mang e và a cùng quét sàn. Giữa clean nhớ e rồi a.",
      "cue": "Sạch bóng với e rồi a: ea.",
      "imageVerified": true
    },
    "33": {
      "anchor": "ea",
      "image": "assets/stories/mnemonic-5193eaf51d6c.webp",
      "visual": "Căn phòng sạch bóng. Hai bạn e, a đứng cạnh gương sáng, giữ thứ tự e rồi a; c, l và n cùng giữ phòng sạch.",
      "text": "Căn phòng sạch bóng. Hai bạn e, a đứng cạnh gương sáng, giữ thứ tự e rồi a; c, l và n cùng giữ phòng sạch.",
      "cue": "Sạch bóng với e rồi a: ea.",
      "imageVerified": true
    }
  }
};
function memoryStory(w){return contextualMemoryStories[w.key]?.[w.page]||memoryStories[w.key];}
function storyAnchorAt(w,story){return Number.isInteger(story.at)?story.at:w.word.indexOf(story.anchor);}
function storyPicture(w,story){if(!story.image||!story.imageVerified)return '';return `<div class="story-picture vocabulary-scene illustrated-mnemonic" data-story-key="${esc(w.key)}"><img class="story-vocabulary-image" src="${esc(story.image)}" alt="${esc(story.visual)}" width="1024" height="1024" decoding="async"></div>`;}


state.storyRecords ||= {};
function storyWord(w,story){const starts=story.ats||[storyAnchorAt(w,story)];let offset=0,html='';for(const at of starts){html+=`${colouredSegment(w,offset,at)}<mark class="story-anchor">${colouredSegment(w,at,at+story.anchor.length)}</mark>`;offset=at+story.anchor.length;}return html+colouredSegment(w,offset,w.word.length);}

function storyPanel(w){const story=memoryStory(w);if(!story||session?.phase!==1)return '';if(!session.storySeen)session.storySeen=new Set();if(!session.storySeen.has(w.key)){session.storySeen.add(w.key);const old=state.storyRecords[w.key]||{};state.storyRecords[w.key]={...old,views:(old.views||0)+1,lastSeen:Date.now()};save();}return `<section class="memory-story" aria-label="Chuyện nhớ chữ"><div class="story-heading"><span>${uiIcon('memory')} TRANH NHỚ CHỮ</span><small>Nhìn tranh, nhớ chữ.</small></div>${storyPicture(w,story)}<div class="story-word" lang="en" aria-label="${esc(w.word)}">${storyWord(w,story)}</div><p>${esc(story.text)}</p><p class="story-instruction">Nhớ chữ sáng nhé!</p></section>`;}
function storyRepairHint(w,val){const story=memoryStory(w);if(!story)return '';if(typeof val==='string'){const anchor=story.anchor.toLowerCase(),typed=normalize(val),last=storyAnchorAt(w,story)+story.anchor.length===w.word.length;const hits=text=>text.split(anchor).length-1;if(story.ats?hits(typed)>=story.ats.length:last?typed.endsWith(anchor):typed.includes(anchor))return '';}const old=state.storyRecords[w.key]||{};state.storyRecords[w.key]={...old,repairHints:(old.repairHints||0)+1,lastHint:Date.now()};save();return `<p class="story-repair-hint">${esc(story.cue)}</p>`;}
