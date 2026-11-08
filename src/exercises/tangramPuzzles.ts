// Auto-generated Tangram Puzzles collection
// 48 rich puzzles across 8 adaptive difficulty levels

export type TangramPieceType = 'LT' | 'MT' | 'ST' | 'SQ' | 'PR';

export interface TangramSlot {
  id: string;
  type: TangramPieceType;
  color: string;
  cx: number;
  cy: number;
  rot: number;
  flip?: boolean;
  points: [number, number][];
}

export interface TangramPuzzle {
  id: string;
  name: string;
  icon: string;
  level: number;
  viewBox: string;
  width: number;
  height: number;
  slots: TangramSlot[];
}

export const TANGRAM_PUZZLES: TangramPuzzle[] = [
  {
    "id": "house_l1",
    "name": "ex.tangram.puzzle.house",
    "icon": "🏠",
    "level": 1,
    "viewBox": "0 0 240 240",
    "width": 240,
    "height": 240,
    "slots": [
      {
        "id": "sq",
        "type": "SQ",
        "color": "#A855F7",
        "cx": 120,
        "cy": 152,
        "rot": 0,
        "flip": false,
        "points": [
          [
            56,
            88
          ],
          [
            184,
            88
          ],
          [
            184,
            216
          ],
          [
            56,
            216
          ]
        ]
      },
      {
        "id": "st1",
        "type": "ST",
        "color": "#10B981",
        "cx": 98.7,
        "cy": 66.7,
        "rot": 180,
        "flip": false,
        "points": [
          [
            56,
            88
          ],
          [
            120,
            24
          ],
          [
            120,
            88
          ]
        ]
      },
      {
        "id": "st2",
        "type": "ST",
        "color": "#06B6D4",
        "cx": 141.3,
        "cy": 66.7,
        "rot": 270,
        "flip": false,
        "points": [
          [
            120,
            88
          ],
          [
            120,
            24
          ],
          [
            184,
            88
          ]
        ]
      }
    ]
  },
  {
    "id": "boat_l1",
    "name": "ex.tangram.puzzle.boat",
    "icon": "⛵",
    "level": 1,
    "viewBox": "0 0 240 240",
    "width": 240,
    "height": 240,
    "slots": [
      {
        "id": "mt",
        "type": "MT",
        "color": "#F59E0B",
        "cx": 130.7,
        "cy": 109.3,
        "rot": 270,
        "flip": false,
        "points": [
          [
            88,
            152
          ],
          [
            216,
            152
          ],
          [
            88,
            24
          ]
        ]
      },
      {
        "id": "st1",
        "type": "ST",
        "color": "#10B981",
        "cx": 66.7,
        "cy": 173.3,
        "rot": 90,
        "flip": false,
        "points": [
          [
            24,
            152
          ],
          [
            88,
            152
          ],
          [
            88,
            216
          ]
        ]
      },
      {
        "id": "st2",
        "type": "ST",
        "color": "#06B6D4",
        "cx": 152,
        "cy": 173.3,
        "rot": 225,
        "flip": false,
        "points": [
          [
            88,
            152
          ],
          [
            216,
            152
          ],
          [
            152,
            216
          ]
        ]
      }
    ]
  },
  {
    "id": "arrow_l1",
    "name": "ex.tangram.puzzle.arrow",
    "icon": "🏹",
    "level": 1,
    "viewBox": "0 0 240 240",
    "width": 240,
    "height": 240,
    "slots": [
      {
        "id": "st1",
        "type": "ST",
        "color": "#10B981",
        "cx": 88,
        "cy": 88,
        "rot": 180,
        "flip": false,
        "points": [
          [
            24,
            120
          ],
          [
            120,
            24
          ],
          [
            120,
            120
          ]
        ]
      },
      {
        "id": "st2",
        "type": "ST",
        "color": "#06B6D4",
        "cx": 152,
        "cy": 88,
        "rot": 270,
        "flip": false,
        "points": [
          [
            120,
            120
          ],
          [
            120,
            24
          ],
          [
            216,
            120
          ]
        ]
      },
      {
        "id": "sq",
        "type": "SQ",
        "color": "#A855F7",
        "cx": 120,
        "cy": 168,
        "rot": 0,
        "flip": false,
        "points": [
          [
            72,
            120
          ],
          [
            168,
            120
          ],
          [
            168,
            216
          ],
          [
            72,
            216
          ]
        ]
      }
    ]
  },
  {
    "id": "candle_l1",
    "name": "ex.tangram.puzzle.candle",
    "icon": "🕯️",
    "level": 1,
    "viewBox": "0 0 240 240",
    "width": 240,
    "height": 240,
    "slots": [
      {
        "id": "st1",
        "type": "ST",
        "color": "#10B981",
        "cx": 104,
        "cy": 56,
        "rot": 180,
        "flip": false,
        "points": [
          [
            72,
            72
          ],
          [
            120,
            24
          ],
          [
            120,
            72
          ]
        ]
      },
      {
        "id": "sq",
        "type": "SQ",
        "color": "#A855F7",
        "cx": 96,
        "cy": 120,
        "rot": 0,
        "flip": false,
        "points": [
          [
            48,
            72
          ],
          [
            144,
            72
          ],
          [
            144,
            168
          ],
          [
            48,
            168
          ]
        ]
      },
      {
        "id": "pr",
        "type": "PR",
        "color": "#84CC16",
        "cx": 120,
        "cy": 192,
        "rot": 0,
        "flip": false,
        "points": [
          [
            48,
            168
          ],
          [
            144,
            168
          ],
          [
            192,
            216
          ],
          [
            96,
            216
          ]
        ]
      }
    ]
  },
  {
    "id": "tree_l1",
    "name": "ex.tangram.puzzle.tree",
    "icon": "🌲",
    "level": 1,
    "viewBox": "0 0 240 240",
    "width": 240,
    "height": 240,
    "slots": [
      {
        "id": "mt",
        "type": "MT",
        "color": "#F59E0B",
        "cx": 120,
        "cy": 112,
        "rot": 45,
        "flip": false,
        "points": [
          [
            24,
            144
          ],
          [
            120,
            48
          ],
          [
            216,
            144
          ]
        ]
      },
      {
        "id": "st1",
        "type": "ST",
        "color": "#10B981",
        "cx": 104,
        "cy": 160,
        "rot": 90,
        "flip": false,
        "points": [
          [
            72,
            144
          ],
          [
            120,
            144
          ],
          [
            120,
            192
          ]
        ]
      },
      {
        "id": "st2",
        "type": "ST",
        "color": "#06B6D4",
        "cx": 136,
        "cy": 160,
        "rot": 0,
        "flip": false,
        "points": [
          [
            120,
            144
          ],
          [
            168,
            144
          ],
          [
            120,
            192
          ]
        ]
      }
    ]
  },
  {
    "id": "mushroom_l1",
    "name": "ex.tangram.puzzle.mushroom",
    "icon": "🍄",
    "level": 1,
    "viewBox": "0 0 240 240",
    "width": 240,
    "height": 240,
    "slots": [
      {
        "id": "mt",
        "type": "MT",
        "color": "#F59E0B",
        "cx": 120,
        "cy": 88,
        "rot": 45,
        "flip": false,
        "points": [
          [
            24,
            120
          ],
          [
            120,
            24
          ],
          [
            216,
            120
          ]
        ]
      },
      {
        "id": "sq",
        "type": "SQ",
        "color": "#A855F7",
        "cx": 120,
        "cy": 168,
        "rot": 0,
        "flip": false,
        "points": [
          [
            72,
            120
          ],
          [
            168,
            120
          ],
          [
            168,
            216
          ],
          [
            72,
            216
          ]
        ]
      },
      {
        "id": "st1",
        "type": "ST",
        "color": "#10B981",
        "cx": 56,
        "cy": 136,
        "rot": 90,
        "flip": false,
        "points": [
          [
            24,
            120
          ],
          [
            72,
            120
          ],
          [
            72,
            168
          ]
        ]
      }
    ]
  },
  {
    "id": "rocket_l2",
    "name": "ex.tangram.puzzle.rocket",
    "icon": "🚀",
    "level": 2,
    "viewBox": "0 0 240 240",
    "width": 240,
    "height": 240,
    "slots": [
      {
        "id": "mt",
        "type": "MT",
        "color": "#F59E0B",
        "cx": 120,
        "cy": 88,
        "rot": 45,
        "flip": false,
        "points": [
          [
            24,
            120
          ],
          [
            120,
            24
          ],
          [
            216,
            120
          ]
        ]
      },
      {
        "id": "sq",
        "type": "SQ",
        "color": "#A855F7",
        "cx": 120,
        "cy": 168,
        "rot": 0,
        "flip": false,
        "points": [
          [
            72,
            120
          ],
          [
            168,
            120
          ],
          [
            168,
            216
          ],
          [
            72,
            216
          ]
        ]
      },
      {
        "id": "st1",
        "type": "ST",
        "color": "#10B981",
        "cx": 56,
        "cy": 200,
        "rot": 180,
        "flip": false,
        "points": [
          [
            24,
            216
          ],
          [
            72,
            216
          ],
          [
            72,
            168
          ]
        ]
      },
      {
        "id": "st2",
        "type": "ST",
        "color": "#06B6D4",
        "cx": 184,
        "cy": 200,
        "rot": 270,
        "flip": false,
        "points": [
          [
            168,
            216
          ],
          [
            216,
            216
          ],
          [
            168,
            168
          ]
        ]
      }
    ]
  },
  {
    "id": "cat_l2",
    "name": "ex.tangram.puzzle.cat",
    "icon": "🐱",
    "level": 2,
    "viewBox": "0 0 240 240",
    "width": 240,
    "height": 240,
    "slots": [
      {
        "id": "sq",
        "type": "SQ",
        "color": "#A855F7",
        "cx": 120,
        "cy": 100.8,
        "rot": 0,
        "flip": false,
        "points": [
          [
            81.6,
            62.4
          ],
          [
            158.4,
            62.4
          ],
          [
            158.4,
            139.2
          ],
          [
            81.6,
            139.2
          ]
        ]
      },
      {
        "id": "st1",
        "type": "ST",
        "color": "#10B981",
        "cx": 107.2,
        "cy": 49.6,
        "rot": 180,
        "flip": false,
        "points": [
          [
            81.6,
            62.4
          ],
          [
            120,
            24
          ],
          [
            120,
            62.4
          ]
        ]
      },
      {
        "id": "st2",
        "type": "ST",
        "color": "#06B6D4",
        "cx": 132.8,
        "cy": 49.6,
        "rot": 270,
        "flip": false,
        "points": [
          [
            120,
            62.4
          ],
          [
            120,
            24
          ],
          [
            158.4,
            62.4
          ]
        ]
      },
      {
        "id": "mt",
        "type": "MT",
        "color": "#F59E0B",
        "cx": 120,
        "cy": 164.8,
        "rot": 225,
        "flip": false,
        "points": [
          [
            43.2,
            139.2
          ],
          [
            120,
            216
          ],
          [
            196.8,
            139.2
          ]
        ]
      }
    ]
  },
  {
    "id": "diamond_l2",
    "name": "ex.tangram.puzzle.diamond",
    "icon": "💎",
    "level": 2,
    "viewBox": "0 0 240 240",
    "width": 240,
    "height": 240,
    "slots": [
      {
        "id": "lt1",
        "type": "LT",
        "color": "#F43F5E",
        "cx": 120,
        "cy": 88,
        "rot": 45,
        "flip": false,
        "points": [
          [
            24,
            120
          ],
          [
            120,
            24
          ],
          [
            216,
            120
          ]
        ]
      },
      {
        "id": "mt",
        "type": "MT",
        "color": "#F59E0B",
        "cx": 120,
        "cy": 152,
        "rot": 225,
        "flip": false,
        "points": [
          [
            24,
            120
          ],
          [
            120,
            216
          ],
          [
            216,
            120
          ]
        ]
      },
      {
        "id": "st1",
        "type": "ST",
        "color": "#10B981",
        "cx": 104,
        "cy": 56,
        "rot": 180,
        "flip": false,
        "points": [
          [
            72,
            72
          ],
          [
            120,
            24
          ],
          [
            120,
            72
          ]
        ]
      },
      {
        "id": "st2",
        "type": "ST",
        "color": "#06B6D4",
        "cx": 136,
        "cy": 56,
        "rot": 270,
        "flip": false,
        "points": [
          [
            120,
            72
          ],
          [
            120,
            24
          ],
          [
            168,
            72
          ]
        ]
      }
    ]
  },
  {
    "id": "sailboat_l2",
    "name": "ex.tangram.puzzle.sailboat",
    "icon": "⛵",
    "level": 2,
    "viewBox": "0 0 240 240",
    "width": 240,
    "height": 240,
    "slots": [
      {
        "id": "lt1",
        "type": "LT",
        "color": "#F43F5E",
        "cx": 120,
        "cy": 164.8,
        "rot": 225,
        "flip": false,
        "points": [
          [
            43.2,
            139.2
          ],
          [
            196.8,
            139.2
          ],
          [
            120,
            216
          ]
        ]
      },
      {
        "id": "mt",
        "type": "MT",
        "color": "#F59E0B",
        "cx": 145.6,
        "cy": 100.8,
        "rot": 270,
        "flip": false,
        "points": [
          [
            120,
            139.2
          ],
          [
            120,
            24
          ],
          [
            196.8,
            139.2
          ]
        ]
      },
      {
        "id": "st1",
        "type": "ST",
        "color": "#10B981",
        "cx": 107.2,
        "cy": 126.4,
        "rot": 180,
        "flip": false,
        "points": [
          [
            81.6,
            139.2
          ],
          [
            120,
            100.8
          ],
          [
            120,
            139.2
          ]
        ]
      },
      {
        "id": "st2",
        "type": "ST",
        "color": "#06B6D4",
        "cx": 107.2,
        "cy": 100.8,
        "rot": 0,
        "flip": false,
        "points": [
          [
            81.6,
            139.2
          ],
          [
            120,
            62.4
          ],
          [
            120,
            100.8
          ]
        ]
      }
    ]
  },
  {
    "id": "hourglass_l2",
    "name": "ex.tangram.puzzle.hourglass",
    "icon": "⏳",
    "level": 2,
    "viewBox": "0 0 240 240",
    "width": 240,
    "height": 240,
    "slots": [
      {
        "id": "mt",
        "type": "MT",
        "color": "#F59E0B",
        "cx": 120,
        "cy": 45.3,
        "rot": 225,
        "flip": false,
        "points": [
          [
            56,
            24
          ],
          [
            184,
            24
          ],
          [
            120,
            88
          ]
        ]
      },
      {
        "id": "sq",
        "type": "SQ",
        "color": "#A855F7",
        "cx": 120,
        "cy": 120,
        "rot": 0,
        "flip": false,
        "points": [
          [
            88,
            88
          ],
          [
            152,
            88
          ],
          [
            152,
            152
          ],
          [
            88,
            152
          ]
        ]
      },
      {
        "id": "st1",
        "type": "ST",
        "color": "#10B981",
        "cx": 98.7,
        "cy": 173.3,
        "rot": 90,
        "flip": false,
        "points": [
          [
            56,
            152
          ],
          [
            120,
            216
          ],
          [
            120,
            152
          ]
        ]
      },
      {
        "id": "st2",
        "type": "ST",
        "color": "#06B6D4",
        "cx": 141.3,
        "cy": 173.3,
        "rot": 0,
        "flip": false,
        "points": [
          [
            120,
            152
          ],
          [
            120,
            216
          ],
          [
            184,
            152
          ]
        ]
      }
    ]
  },
  {
    "id": "fish_l2",
    "name": "ex.tangram.puzzle.fish",
    "icon": "🐟",
    "level": 2,
    "viewBox": "0 0 240 240",
    "width": 240,
    "height": 240,
    "slots": [
      {
        "id": "sq",
        "type": "SQ",
        "color": "#A855F7",
        "cx": 100.8,
        "cy": 120,
        "rot": 0,
        "flip": false,
        "points": [
          [
            62.4,
            81.6
          ],
          [
            139.2,
            81.6
          ],
          [
            139.2,
            158.4
          ],
          [
            62.4,
            158.4
          ]
        ]
      },
      {
        "id": "mt",
        "type": "MT",
        "color": "#F59E0B",
        "cx": 164.8,
        "cy": 120,
        "rot": 0,
        "flip": false,
        "points": [
          [
            139.2,
            81.6
          ],
          [
            216,
            120
          ],
          [
            139.2,
            158.4
          ]
        ]
      },
      {
        "id": "st1",
        "type": "ST",
        "color": "#10B981",
        "cx": 49.6,
        "cy": 81.6,
        "rot": 0,
        "flip": false,
        "points": [
          [
            24,
            43.2
          ],
          [
            62.4,
            81.6
          ],
          [
            62.4,
            120
          ]
        ]
      },
      {
        "id": "st2",
        "type": "ST",
        "color": "#06B6D4",
        "cx": 49.6,
        "cy": 158.4,
        "rot": 0,
        "flip": false,
        "points": [
          [
            24,
            196.8
          ],
          [
            62.4,
            158.4
          ],
          [
            62.4,
            120
          ]
        ]
      }
    ]
  },
  {
    "id": "fox_l3",
    "name": "ex.tangram.puzzle.fox",
    "icon": "🦊",
    "level": 3,
    "viewBox": "0 0 240 240",
    "width": 240,
    "height": 240,
    "slots": [
      {
        "id": "lt1",
        "type": "LT",
        "color": "#F43F5E",
        "cx": 120,
        "cy": 152,
        "rot": 225,
        "flip": false,
        "points": [
          [
            24,
            120
          ],
          [
            120,
            216
          ],
          [
            216,
            120
          ]
        ]
      },
      {
        "id": "sq",
        "type": "SQ",
        "color": "#A855F7",
        "cx": 120,
        "cy": 72,
        "rot": 0,
        "flip": false,
        "points": [
          [
            72,
            24
          ],
          [
            168,
            24
          ],
          [
            168,
            120
          ],
          [
            72,
            120
          ]
        ]
      },
      {
        "id": "st1",
        "type": "ST",
        "color": "#10B981",
        "cx": 56,
        "cy": 40,
        "rot": 90,
        "flip": false,
        "points": [
          [
            24,
            24
          ],
          [
            72,
            24
          ],
          [
            72,
            72
          ]
        ]
      },
      {
        "id": "st2",
        "type": "ST",
        "color": "#06B6D4",
        "cx": 184,
        "cy": 40,
        "rot": 0,
        "flip": false,
        "points": [
          [
            168,
            24
          ],
          [
            216,
            24
          ],
          [
            168,
            72
          ]
        ]
      }
    ]
  },
  {
    "id": "crown_l3",
    "name": "ex.tangram.puzzle.crown",
    "icon": "👑",
    "level": 3,
    "viewBox": "0 0 240 240",
    "width": 240,
    "height": 240,
    "slots": [
      {
        "id": "lt1",
        "type": "LT",
        "color": "#F43F5E",
        "cx": 120,
        "cy": 164.8,
        "rot": 225,
        "flip": false,
        "points": [
          [
            43.2,
            139.2
          ],
          [
            196.8,
            139.2
          ],
          [
            120,
            216
          ]
        ]
      },
      {
        "id": "sq",
        "type": "SQ",
        "color": "#A855F7",
        "cx": 120,
        "cy": 100.8,
        "rot": 0,
        "flip": false,
        "points": [
          [
            81.6,
            62.4
          ],
          [
            158.4,
            62.4
          ],
          [
            158.4,
            139.2
          ],
          [
            81.6,
            139.2
          ]
        ]
      },
      {
        "id": "st1",
        "type": "ST",
        "color": "#10B981",
        "cx": 56,
        "cy": 88,
        "rot": 0,
        "flip": false,
        "points": [
          [
            43.2,
            62.4
          ],
          [
            81.6,
            62.4
          ],
          [
            43.2,
            139.2
          ]
        ]
      },
      {
        "id": "st2",
        "type": "ST",
        "color": "#06B6D4",
        "cx": 184,
        "cy": 88,
        "rot": 90,
        "flip": false,
        "points": [
          [
            158.4,
            62.4
          ],
          [
            196.8,
            62.4
          ],
          [
            196.8,
            139.2
          ]
        ]
      },
      {
        "id": "mt",
        "type": "MT",
        "color": "#F59E0B",
        "cx": 120,
        "cy": 49.6,
        "rot": 45,
        "flip": false,
        "points": [
          [
            81.6,
            62.4
          ],
          [
            120,
            24
          ],
          [
            158.4,
            62.4
          ]
        ]
      }
    ]
  },
  {
    "id": "windmill_l3",
    "name": "ex.tangram.puzzle.windmill",
    "icon": "💨",
    "level": 3,
    "viewBox": "0 0 240 240",
    "width": 240,
    "height": 240,
    "slots": [
      {
        "id": "lt1",
        "type": "LT",
        "color": "#F43F5E",
        "cx": 98.7,
        "cy": 66.7,
        "rot": 180,
        "flip": false,
        "points": [
          [
            56,
            88
          ],
          [
            120,
            24
          ],
          [
            120,
            88
          ]
        ]
      },
      {
        "id": "mt",
        "type": "MT",
        "color": "#F59E0B",
        "cx": 141.3,
        "cy": 66.7,
        "rot": 270,
        "flip": false,
        "points": [
          [
            120,
            24
          ],
          [
            184,
            88
          ],
          [
            120,
            88
          ]
        ]
      },
      {
        "id": "st1",
        "type": "ST",
        "color": "#10B981",
        "cx": 141.3,
        "cy": 109.3,
        "rot": 0,
        "flip": false,
        "points": [
          [
            120,
            88
          ],
          [
            184,
            88
          ],
          [
            120,
            152
          ]
        ]
      },
      {
        "id": "st2",
        "type": "ST",
        "color": "#06B6D4",
        "cx": 98.7,
        "cy": 109.3,
        "rot": 90,
        "flip": false,
        "points": [
          [
            56,
            88
          ],
          [
            120,
            88
          ],
          [
            120,
            152
          ]
        ]
      },
      {
        "id": "pr",
        "type": "PR",
        "color": "#84CC16",
        "cx": 136,
        "cy": 184,
        "rot": 45,
        "flip": false,
        "points": [
          [
            88,
            152
          ],
          [
            152,
            152
          ],
          [
            184,
            216
          ],
          [
            120,
            216
          ]
        ]
      }
    ]
  },
  {
    "id": "teacup_l3",
    "name": "ex.tangram.puzzle.teacup",
    "icon": "🍵",
    "level": 3,
    "viewBox": "0 0 240 240",
    "width": 240,
    "height": 240,
    "slots": [
      {
        "id": "sq",
        "type": "SQ",
        "color": "#A855F7",
        "cx": 120,
        "cy": 88,
        "rot": 0,
        "flip": false,
        "points": [
          [
            88,
            56
          ],
          [
            152,
            56
          ],
          [
            152,
            120
          ],
          [
            88,
            120
          ]
        ]
      },
      {
        "id": "lt1",
        "type": "LT",
        "color": "#F43F5E",
        "cx": 120,
        "cy": 141.3,
        "rot": 225,
        "flip": false,
        "points": [
          [
            56,
            120
          ],
          [
            184,
            120
          ],
          [
            120,
            184
          ]
        ]
      },
      {
        "id": "pr",
        "type": "PR",
        "color": "#84CC16",
        "cx": 168,
        "cy": 72,
        "rot": 90,
        "flip": false,
        "points": [
          [
            152,
            56
          ],
          [
            184,
            24
          ],
          [
            184,
            88
          ],
          [
            152,
            120
          ]
        ]
      },
      {
        "id": "st1",
        "type": "ST",
        "color": "#10B981",
        "cx": 88,
        "cy": 194.7,
        "rot": 225,
        "flip": false,
        "points": [
          [
            56,
            184
          ],
          [
            120,
            184
          ],
          [
            88,
            216
          ]
        ]
      },
      {
        "id": "st2",
        "type": "ST",
        "color": "#06B6D4",
        "cx": 152,
        "cy": 194.7,
        "rot": 225,
        "flip": false,
        "points": [
          [
            120,
            184
          ],
          [
            184,
            184
          ],
          [
            152,
            216
          ]
        ]
      }
    ]
  },
  {
    "id": "glider_l3",
    "name": "ex.tangram.puzzle.glider",
    "icon": "✈️",
    "level": 3,
    "viewBox": "0 0 240 240",
    "width": 240,
    "height": 240,
    "slots": [
      {
        "id": "lt1",
        "type": "LT",
        "color": "#F43F5E",
        "cx": 88,
        "cy": 112,
        "rot": 180,
        "flip": false,
        "points": [
          [
            24,
            144
          ],
          [
            120,
            48
          ],
          [
            120,
            144
          ]
        ]
      },
      {
        "id": "lt2",
        "type": "LT",
        "color": "#6366F1",
        "cx": 152,
        "cy": 112,
        "rot": 270,
        "flip": false,
        "points": [
          [
            120,
            48
          ],
          [
            216,
            144
          ],
          [
            120,
            144
          ]
        ]
      },
      {
        "id": "st1",
        "type": "ST",
        "color": "#10B981",
        "cx": 104,
        "cy": 160,
        "rot": 90,
        "flip": false,
        "points": [
          [
            72,
            144
          ],
          [
            120,
            144
          ],
          [
            120,
            192
          ]
        ]
      },
      {
        "id": "st2",
        "type": "ST",
        "color": "#06B6D4",
        "cx": 136,
        "cy": 160,
        "rot": 0,
        "flip": false,
        "points": [
          [
            120,
            144
          ],
          [
            168,
            144
          ],
          [
            120,
            192
          ]
        ]
      }
    ]
  },
  {
    "id": "flamingo_l3",
    "name": "ex.tangram.puzzle.flamingo",
    "icon": "🦩",
    "level": 3,
    "viewBox": "0 0 240 240",
    "width": 240,
    "height": 240,
    "slots": [
      {
        "id": "st1",
        "type": "ST",
        "color": "#10B981",
        "cx": 129.1,
        "cy": 33.1,
        "rot": 0,
        "flip": false,
        "points": [
          [
            120,
            24
          ],
          [
            147.4,
            24
          ],
          [
            120,
            51.4
          ]
        ]
      },
      {
        "id": "st2",
        "type": "ST",
        "color": "#06B6D4",
        "cx": 156.6,
        "cy": 42.3,
        "rot": 270,
        "flip": false,
        "points": [
          [
            147.4,
            24
          ],
          [
            174.9,
            51.4
          ],
          [
            147.4,
            51.4
          ]
        ]
      },
      {
        "id": "pr",
        "type": "PR",
        "color": "#84CC16",
        "cx": 120,
        "cy": 78.9,
        "rot": 135,
        "flip": false,
        "points": [
          [
            120,
            51.4
          ],
          [
            147.4,
            51.4
          ],
          [
            120,
            106.3
          ],
          [
            92.6,
            106.3
          ]
        ]
      },
      {
        "id": "lt1",
        "type": "LT",
        "color": "#F43F5E",
        "cx": 120,
        "cy": 124.6,
        "rot": 225,
        "flip": false,
        "points": [
          [
            65.1,
            106.3
          ],
          [
            174.9,
            106.3
          ],
          [
            120,
            161.1
          ]
        ]
      },
      {
        "id": "mt",
        "type": "MT",
        "color": "#F59E0B",
        "cx": 101.7,
        "cy": 179.4,
        "rot": 0,
        "flip": false,
        "points": [
          [
            92.6,
            161.1
          ],
          [
            120,
            161.1
          ],
          [
            92.6,
            216
          ]
        ]
      }
    ]
  },
  {
    "id": "seahorse_l4",
    "name": "ex.tangram.puzzle.seahorse",
    "icon": "🌊",
    "level": 4,
    "viewBox": "0 0 240 240",
    "width": 240,
    "height": 240,
    "slots": [
      {
        "id": "sq",
        "type": "SQ",
        "color": "#A855F7",
        "cx": 120,
        "cy": 48,
        "rot": 0,
        "flip": false,
        "points": [
          [
            96,
            24
          ],
          [
            144,
            24
          ],
          [
            144,
            72
          ],
          [
            96,
            72
          ]
        ]
      },
      {
        "id": "st1",
        "type": "ST",
        "color": "#10B981",
        "cx": 88,
        "cy": 48,
        "rot": 315,
        "flip": false,
        "points": [
          [
            72,
            48
          ],
          [
            96,
            24
          ],
          [
            96,
            72
          ]
        ]
      },
      {
        "id": "pr",
        "type": "PR",
        "color": "#84CC16",
        "cx": 108,
        "cy": 96,
        "rot": 135,
        "flip": false,
        "points": [
          [
            96,
            72
          ],
          [
            144,
            72
          ],
          [
            120,
            120
          ],
          [
            72,
            120
          ]
        ]
      },
      {
        "id": "lt1",
        "type": "LT",
        "color": "#F43F5E",
        "cx": 120,
        "cy": 136,
        "rot": 225,
        "flip": false,
        "points": [
          [
            72,
            120
          ],
          [
            168,
            120
          ],
          [
            120,
            168
          ]
        ]
      },
      {
        "id": "mt",
        "type": "MT",
        "color": "#F59E0B",
        "cx": 120,
        "cy": 184,
        "rot": 0,
        "flip": false,
        "points": [
          [
            96,
            168
          ],
          [
            144,
            168
          ],
          [
            120,
            216
          ]
        ]
      }
    ]
  },
  {
    "id": "copter_l4",
    "name": "ex.tangram.puzzle.copter",
    "icon": "🚁",
    "level": 4,
    "viewBox": "0 0 240 240",
    "width": 240,
    "height": 240,
    "slots": [
      {
        "id": "st1",
        "type": "ST",
        "color": "#10B981",
        "cx": 62.4,
        "cy": 36.8,
        "rot": 225,
        "flip": false,
        "points": [
          [
            24,
            24
          ],
          [
            100.8,
            24
          ],
          [
            62.4,
            62.4
          ]
        ]
      },
      {
        "id": "st2",
        "type": "ST",
        "color": "#06B6D4",
        "cx": 139.2,
        "cy": 36.8,
        "rot": 225,
        "flip": false,
        "points": [
          [
            100.8,
            24
          ],
          [
            177.6,
            24
          ],
          [
            139.2,
            62.4
          ]
        ]
      },
      {
        "id": "sq",
        "type": "SQ",
        "color": "#A855F7",
        "cx": 100.8,
        "cy": 100.8,
        "rot": 0,
        "flip": false,
        "points": [
          [
            62.4,
            62.4
          ],
          [
            139.2,
            62.4
          ],
          [
            139.2,
            139.2
          ],
          [
            62.4,
            139.2
          ]
        ]
      },
      {
        "id": "lt1",
        "type": "LT",
        "color": "#F43F5E",
        "cx": 100.8,
        "cy": 164.8,
        "rot": 225,
        "flip": false,
        "points": [
          [
            24,
            139.2
          ],
          [
            177.6,
            139.2
          ],
          [
            100.8,
            216
          ]
        ]
      },
      {
        "id": "mt",
        "type": "MT",
        "color": "#F59E0B",
        "cx": 164.8,
        "cy": 100.8,
        "rot": 0,
        "flip": false,
        "points": [
          [
            139.2,
            62.4
          ],
          [
            216,
            100.8
          ],
          [
            139.2,
            139.2
          ]
        ]
      }
    ]
  },
  {
    "id": "train_l4",
    "name": "ex.tangram.puzzle.train",
    "icon": "🚂",
    "level": 4,
    "viewBox": "0 0 240 240",
    "width": 240,
    "height": 240,
    "slots": [
      {
        "id": "sq",
        "type": "SQ",
        "color": "#A855F7",
        "cx": 56,
        "cy": 120,
        "rot": 0,
        "flip": false,
        "points": [
          [
            24,
            88
          ],
          [
            88,
            88
          ],
          [
            88,
            152
          ],
          [
            24,
            152
          ]
        ]
      },
      {
        "id": "lt1",
        "type": "LT",
        "color": "#F43F5E",
        "cx": 152,
        "cy": 109.3,
        "rot": 225,
        "flip": false,
        "points": [
          [
            88,
            88
          ],
          [
            216,
            88
          ],
          [
            152,
            152
          ]
        ]
      },
      {
        "id": "pr",
        "type": "PR",
        "color": "#84CC16",
        "cx": 56,
        "cy": 72,
        "rot": 45,
        "flip": false,
        "points": [
          [
            24,
            56
          ],
          [
            56,
            56
          ],
          [
            88,
            88
          ],
          [
            56,
            88
          ]
        ]
      },
      {
        "id": "st1",
        "type": "ST",
        "color": "#10B981",
        "cx": 56,
        "cy": 162.7,
        "rot": 225,
        "flip": false,
        "points": [
          [
            24,
            152
          ],
          [
            88,
            152
          ],
          [
            56,
            184
          ]
        ]
      },
      {
        "id": "st2",
        "type": "ST",
        "color": "#06B6D4",
        "cx": 120,
        "cy": 162.7,
        "rot": 225,
        "flip": false,
        "points": [
          [
            88,
            152
          ],
          [
            152,
            152
          ],
          [
            120,
            184
          ]
        ]
      }
    ]
  },
  {
    "id": "cabin_boat_l4",
    "name": "ex.tangram.puzzle.cabinBoat",
    "icon": "🛥️",
    "level": 4,
    "viewBox": "0 0 240 240",
    "width": 240,
    "height": 240,
    "slots": [
      {
        "id": "lt1",
        "type": "LT",
        "color": "#F43F5E",
        "cx": 72,
        "cy": 148,
        "rot": 225,
        "flip": false,
        "points": [
          [
            24,
            132
          ],
          [
            120,
            132
          ],
          [
            72,
            180
          ]
        ]
      },
      {
        "id": "lt2",
        "type": "LT",
        "color": "#6366F1",
        "cx": 168,
        "cy": 148,
        "rot": 225,
        "flip": false,
        "points": [
          [
            120,
            132
          ],
          [
            216,
            132
          ],
          [
            168,
            180
          ]
        ]
      },
      {
        "id": "mt",
        "type": "MT",
        "color": "#F59E0B",
        "cx": 88,
        "cy": 108,
        "rot": 270,
        "flip": false,
        "points": [
          [
            72,
            132
          ],
          [
            72,
            60
          ],
          [
            120,
            132
          ]
        ]
      },
      {
        "id": "st1",
        "type": "ST",
        "color": "#10B981",
        "cx": 128,
        "cy": 108,
        "rot": 135,
        "flip": false,
        "points": [
          [
            120,
            132
          ],
          [
            120,
            84
          ],
          [
            144,
            108
          ]
        ]
      },
      {
        "id": "st2",
        "type": "ST",
        "color": "#06B6D4",
        "cx": 144,
        "cy": 124,
        "rot": 45,
        "flip": false,
        "points": [
          [
            120,
            132
          ],
          [
            144,
            108
          ],
          [
            168,
            132
          ]
        ]
      }
    ]
  },
  {
    "id": "temple_l4",
    "name": "ex.tangram.puzzle.temple",
    "icon": "🏛️",
    "level": 4,
    "viewBox": "0 0 240 240",
    "width": 240,
    "height": 240,
    "slots": [
      {
        "id": "sq",
        "type": "SQ",
        "color": "#A855F7",
        "cx": 120,
        "cy": 72,
        "rot": 0,
        "flip": false,
        "points": [
          [
            88,
            40
          ],
          [
            152,
            40
          ],
          [
            152,
            104
          ],
          [
            88,
            104
          ]
        ]
      },
      {
        "id": "mt",
        "type": "MT",
        "color": "#F59E0B",
        "cx": 120,
        "cy": 82.7,
        "rot": 45,
        "flip": false,
        "points": [
          [
            56,
            104
          ],
          [
            184,
            104
          ],
          [
            120,
            40
          ]
        ]
      },
      {
        "id": "lt1",
        "type": "LT",
        "color": "#F43F5E",
        "cx": 88,
        "cy": 125.3,
        "rot": 225,
        "flip": false,
        "points": [
          [
            24,
            104
          ],
          [
            152,
            104
          ],
          [
            88,
            168
          ]
        ]
      },
      {
        "id": "lt2",
        "type": "LT",
        "color": "#6366F1",
        "cx": 152,
        "cy": 125.3,
        "rot": 225,
        "flip": false,
        "points": [
          [
            88,
            104
          ],
          [
            216,
            104
          ],
          [
            152,
            168
          ]
        ]
      },
      {
        "id": "st1",
        "type": "ST",
        "color": "#10B981",
        "cx": 120,
        "cy": 178.7,
        "rot": 225,
        "flip": false,
        "points": [
          [
            88,
            168
          ],
          [
            152,
            168
          ],
          [
            120,
            200
          ]
        ]
      }
    ]
  },
  {
    "id": "young_swan_l4",
    "name": "ex.tangram.puzzle.youngSwan",
    "icon": "🦢",
    "level": 4,
    "viewBox": "0 0 240 240",
    "width": 240,
    "height": 240,
    "slots": [
      {
        "id": "st1",
        "type": "ST",
        "color": "#10B981",
        "cx": 36.8,
        "cy": 36.8,
        "rot": 0,
        "flip": false,
        "points": [
          [
            24,
            24
          ],
          [
            62.4,
            24
          ],
          [
            24,
            62.4
          ]
        ]
      },
      {
        "id": "sq",
        "type": "SQ",
        "color": "#A855F7",
        "cx": 43.2,
        "cy": 81.6,
        "rot": 0,
        "flip": false,
        "points": [
          [
            24,
            62.4
          ],
          [
            62.4,
            62.4
          ],
          [
            62.4,
            100.8
          ],
          [
            24,
            100.8
          ]
        ]
      },
      {
        "id": "st2",
        "type": "ST",
        "color": "#06B6D4",
        "cx": 49.6,
        "cy": 113.6,
        "rot": 90,
        "flip": false,
        "points": [
          [
            24,
            100.8
          ],
          [
            62.4,
            100.8
          ],
          [
            62.4,
            139.2
          ]
        ]
      },
      {
        "id": "lt1",
        "type": "LT",
        "color": "#F43F5E",
        "cx": 139.2,
        "cy": 164.8,
        "rot": 225,
        "flip": false,
        "points": [
          [
            62.4,
            139.2
          ],
          [
            216,
            139.2
          ],
          [
            139.2,
            216
          ]
        ]
      },
      {
        "id": "mt",
        "type": "MT",
        "color": "#F59E0B",
        "cx": 190.4,
        "cy": 190.4,
        "rot": 180,
        "flip": false,
        "points": [
          [
            139.2,
            216
          ],
          [
            216,
            139.2
          ],
          [
            216,
            216
          ]
        ]
      }
    ]
  },
  {
    "id": "camel_l5",
    "name": "ex.tangram.puzzle.camel",
    "icon": "🐫",
    "level": 5,
    "viewBox": "0 0 240 240",
    "width": 240,
    "height": 240,
    "slots": [
      {
        "id": "st1",
        "type": "ST",
        "color": "#10B981",
        "cx": 40,
        "cy": 52,
        "rot": 180,
        "flip": false,
        "points": [
          [
            24,
            60
          ],
          [
            48,
            36
          ],
          [
            48,
            60
          ]
        ]
      },
      {
        "id": "sq",
        "type": "SQ",
        "color": "#A855F7",
        "cx": 72,
        "cy": 84,
        "rot": 0,
        "flip": false,
        "points": [
          [
            48,
            60
          ],
          [
            96,
            60
          ],
          [
            96,
            108
          ],
          [
            48,
            108
          ]
        ]
      },
      {
        "id": "lt1",
        "type": "LT",
        "color": "#F43F5E",
        "cx": 144,
        "cy": 76,
        "rot": 225,
        "flip": false,
        "points": [
          [
            96,
            60
          ],
          [
            192,
            60
          ],
          [
            144,
            108
          ]
        ]
      },
      {
        "id": "lt2",
        "type": "LT",
        "color": "#6366F1",
        "cx": 144,
        "cy": 124,
        "rot": 225,
        "flip": false,
        "points": [
          [
            96,
            108
          ],
          [
            192,
            108
          ],
          [
            144,
            156
          ]
        ]
      },
      {
        "id": "mt",
        "type": "MT",
        "color": "#F59E0B",
        "cx": 72,
        "cy": 124,
        "rot": 0,
        "flip": false,
        "points": [
          [
            48,
            108
          ],
          [
            96,
            108
          ],
          [
            72,
            156
          ]
        ]
      },
      {
        "id": "pr",
        "type": "PR",
        "color": "#84CC16",
        "cx": 180,
        "cy": 180,
        "rot": 45,
        "flip": false,
        "points": [
          [
            144,
            156
          ],
          [
            192,
            156
          ],
          [
            216,
            204
          ],
          [
            168,
            204
          ]
        ]
      }
    ]
  },
  {
    "id": "dog_l5",
    "name": "ex.tangram.puzzle.dog",
    "icon": "🐕",
    "level": 5,
    "viewBox": "0 0 240 240",
    "width": 240,
    "height": 240,
    "slots": [
      {
        "id": "st1",
        "type": "ST",
        "color": "#10B981",
        "cx": 46.8,
        "cy": 33.1,
        "rot": 0,
        "flip": false,
        "points": [
          [
            37.7,
            24
          ],
          [
            65.1,
            24
          ],
          [
            37.7,
            51.4
          ]
        ]
      },
      {
        "id": "sq",
        "type": "SQ",
        "color": "#A855F7",
        "cx": 65.2,
        "cy": 78.9,
        "rot": 0,
        "flip": false,
        "points": [
          [
            37.7,
            51.4
          ],
          [
            92.6,
            51.4
          ],
          [
            92.6,
            106.3
          ],
          [
            37.7,
            106.3
          ]
        ]
      },
      {
        "id": "st2",
        "type": "ST",
        "color": "#06B6D4",
        "cx": 101.7,
        "cy": 60.6,
        "rot": 0,
        "flip": false,
        "points": [
          [
            92.6,
            51.4
          ],
          [
            120,
            51.4
          ],
          [
            92.6,
            78.9
          ]
        ]
      },
      {
        "id": "lt1",
        "type": "LT",
        "color": "#F43F5E",
        "cx": 92.6,
        "cy": 124.6,
        "rot": 225,
        "flip": false,
        "points": [
          [
            37.7,
            106.3
          ],
          [
            147.4,
            106.3
          ],
          [
            92.6,
            161.1
          ]
        ]
      },
      {
        "id": "lt2",
        "type": "LT",
        "color": "#6366F1",
        "cx": 147.4,
        "cy": 179.4,
        "rot": 225,
        "flip": false,
        "points": [
          [
            92.6,
            161.1
          ],
          [
            202.3,
            161.1
          ],
          [
            147.4,
            216
          ]
        ]
      },
      {
        "id": "mt",
        "type": "MT",
        "color": "#F59E0B",
        "cx": 65.1,
        "cy": 179.4,
        "rot": 0,
        "flip": false,
        "points": [
          [
            37.7,
            161.1
          ],
          [
            92.6,
            161.1
          ],
          [
            65.1,
            216
          ]
        ]
      }
    ]
  },
  {
    "id": "hawk_l5",
    "name": "ex.tangram.puzzle.hawk",
    "icon": "🦅",
    "level": 5,
    "viewBox": "0 0 240 240",
    "width": 240,
    "height": 240,
    "slots": [
      {
        "id": "st1",
        "type": "ST",
        "color": "#10B981",
        "cx": 114.7,
        "cy": 45.3,
        "rot": 270,
        "flip": false,
        "points": [
          [
            104,
            24
          ],
          [
            136,
            56
          ],
          [
            104,
            56
          ]
        ]
      },
      {
        "id": "sq",
        "type": "SQ",
        "color": "#A855F7",
        "cx": 120,
        "cy": 72,
        "rot": 0,
        "flip": false,
        "points": [
          [
            104,
            56
          ],
          [
            136,
            56
          ],
          [
            136,
            88
          ],
          [
            104,
            88
          ]
        ]
      },
      {
        "id": "lt1",
        "type": "LT",
        "color": "#F43F5E",
        "cx": 82.7,
        "cy": 109.3,
        "rot": 90,
        "flip": false,
        "points": [
          [
            40,
            88
          ],
          [
            104,
            88
          ],
          [
            104,
            152
          ]
        ]
      },
      {
        "id": "lt2",
        "type": "LT",
        "color": "#6366F1",
        "cx": 157.3,
        "cy": 109.3,
        "rot": 0,
        "flip": false,
        "points": [
          [
            136,
            88
          ],
          [
            200,
            88
          ],
          [
            136,
            152
          ]
        ]
      },
      {
        "id": "mt",
        "type": "MT",
        "color": "#F59E0B",
        "cx": 120,
        "cy": 109.3,
        "rot": 0,
        "flip": false,
        "points": [
          [
            104,
            88
          ],
          [
            136,
            88
          ],
          [
            120,
            152
          ]
        ]
      },
      {
        "id": "pr",
        "type": "PR",
        "color": "#84CC16",
        "cx": 128,
        "cy": 184,
        "rot": 90,
        "flip": false,
        "points": [
          [
            104,
            152
          ],
          [
            136,
            152
          ],
          [
            152,
            216
          ],
          [
            120,
            216
          ]
        ]
      }
    ]
  },
  {
    "id": "samurai_l5",
    "name": "ex.tangram.puzzle.samurai",
    "icon": "⚔️",
    "level": 5,
    "viewBox": "0 0 240 240",
    "width": 240,
    "height": 240,
    "slots": [
      {
        "id": "sq",
        "type": "SQ",
        "color": "#A855F7",
        "cx": 120,
        "cy": 40,
        "rot": 0,
        "flip": false,
        "points": [
          [
            104,
            24
          ],
          [
            136,
            24
          ],
          [
            136,
            56
          ],
          [
            104,
            56
          ]
        ]
      },
      {
        "id": "st1",
        "type": "ST",
        "color": "#10B981",
        "cx": 93.3,
        "cy": 66.7,
        "rot": 90,
        "flip": false,
        "points": [
          [
            72,
            56
          ],
          [
            104,
            56
          ],
          [
            104,
            88
          ]
        ]
      },
      {
        "id": "st2",
        "type": "ST",
        "color": "#06B6D4",
        "cx": 146.7,
        "cy": 66.7,
        "rot": 0,
        "flip": false,
        "points": [
          [
            136,
            56
          ],
          [
            168,
            56
          ],
          [
            136,
            88
          ]
        ]
      },
      {
        "id": "mt",
        "type": "MT",
        "color": "#F59E0B",
        "cx": 120,
        "cy": 66.7,
        "rot": 225,
        "flip": false,
        "points": [
          [
            88,
            56
          ],
          [
            152,
            56
          ],
          [
            120,
            88
          ]
        ]
      },
      {
        "id": "lt1",
        "type": "LT",
        "color": "#F43F5E",
        "cx": 120,
        "cy": 109.3,
        "rot": 225,
        "flip": false,
        "points": [
          [
            56,
            88
          ],
          [
            184,
            88
          ],
          [
            120,
            152
          ]
        ]
      },
      {
        "id": "lt2",
        "type": "LT",
        "color": "#6366F1",
        "cx": 120,
        "cy": 173.3,
        "rot": 225,
        "flip": false,
        "points": [
          [
            56,
            152
          ],
          [
            184,
            152
          ],
          [
            120,
            216
          ]
        ]
      }
    ]
  },
  {
    "id": "tower_l5",
    "name": "ex.tangram.puzzle.tower",
    "icon": "🗼",
    "level": 5,
    "viewBox": "0 0 240 240",
    "width": 240,
    "height": 240,
    "slots": [
      {
        "id": "st1",
        "type": "ST",
        "color": "#10B981",
        "cx": 120,
        "cy": 32,
        "rot": 0,
        "flip": false,
        "points": [
          [
            108,
            24
          ],
          [
            132,
            24
          ],
          [
            120,
            48
          ]
        ]
      },
      {
        "id": "st2",
        "type": "ST",
        "color": "#06B6D4",
        "cx": 120,
        "cy": 56,
        "rot": 225,
        "flip": false,
        "points": [
          [
            96,
            48
          ],
          [
            144,
            48
          ],
          [
            120,
            72
          ]
        ]
      },
      {
        "id": "sq",
        "type": "SQ",
        "color": "#A855F7",
        "cx": 120,
        "cy": 96,
        "rot": 0,
        "flip": false,
        "points": [
          [
            96,
            72
          ],
          [
            144,
            72
          ],
          [
            144,
            120
          ],
          [
            96,
            120
          ]
        ]
      },
      {
        "id": "mt",
        "type": "MT",
        "color": "#F59E0B",
        "cx": 120,
        "cy": 136,
        "rot": 225,
        "flip": false,
        "points": [
          [
            72,
            120
          ],
          [
            168,
            120
          ],
          [
            120,
            168
          ]
        ]
      },
      {
        "id": "lt1",
        "type": "LT",
        "color": "#F43F5E",
        "cx": 96,
        "cy": 184,
        "rot": 0,
        "flip": false,
        "points": [
          [
            72,
            168
          ],
          [
            120,
            168
          ],
          [
            96,
            216
          ]
        ]
      },
      {
        "id": "lt2",
        "type": "LT",
        "color": "#6366F1",
        "cx": 144,
        "cy": 184,
        "rot": 0,
        "flip": false,
        "points": [
          [
            120,
            168
          ],
          [
            168,
            168
          ],
          [
            144,
            216
          ]
        ]
      }
    ]
  },
  {
    "id": "swallow_l5",
    "name": "ex.tangram.puzzle.swallow",
    "icon": "🕊️",
    "level": 5,
    "viewBox": "0 0 240 240",
    "width": 240,
    "height": 240,
    "slots": [
      {
        "id": "st1",
        "type": "ST",
        "color": "#10B981",
        "cx": 120,
        "cy": 34.7,
        "rot": 0,
        "flip": false,
        "points": [
          [
            104,
            24
          ],
          [
            136,
            24
          ],
          [
            120,
            56
          ]
        ]
      },
      {
        "id": "mt",
        "type": "MT",
        "color": "#F59E0B",
        "cx": 120,
        "cy": 66.7,
        "rot": 225,
        "flip": false,
        "points": [
          [
            88,
            56
          ],
          [
            152,
            56
          ],
          [
            120,
            88
          ]
        ]
      },
      {
        "id": "lt1",
        "type": "LT",
        "color": "#F43F5E",
        "cx": 98.7,
        "cy": 109.3,
        "rot": 90,
        "flip": false,
        "points": [
          [
            56,
            88
          ],
          [
            120,
            88
          ],
          [
            120,
            152
          ]
        ]
      },
      {
        "id": "lt2",
        "type": "LT",
        "color": "#6366F1",
        "cx": 141.3,
        "cy": 109.3,
        "rot": 0,
        "flip": false,
        "points": [
          [
            120,
            88
          ],
          [
            184,
            88
          ],
          [
            120,
            152
          ]
        ]
      },
      {
        "id": "st2",
        "type": "ST",
        "color": "#06B6D4",
        "cx": 104,
        "cy": 162.7,
        "rot": 0,
        "flip": false,
        "points": [
          [
            88,
            152
          ],
          [
            120,
            152
          ],
          [
            104,
            184
          ]
        ]
      },
      {
        "id": "pr",
        "type": "PR",
        "color": "#84CC16",
        "cx": 144,
        "cy": 184,
        "rot": 90,
        "flip": false,
        "points": [
          [
            120,
            152
          ],
          [
            152,
            152
          ],
          [
            168,
            216
          ],
          [
            136,
            216
          ]
        ]
      }
    ]
  },
  {
    "id": "classic_square_l6",
    "name": "ex.tangram.puzzle.square",
    "icon": "🔲",
    "level": 6,
    "viewBox": "0 0 240 240",
    "width": 240,
    "height": 240,
    "slots": [
      {
        "id": "lt1",
        "type": "LT",
        "color": "#F43F5E",
        "cx": 120,
        "cy": 56,
        "rot": 225,
        "flip": false,
        "points": [
          [
            24,
            24
          ],
          [
            216,
            24
          ],
          [
            120,
            120
          ]
        ]
      },
      {
        "id": "lt2",
        "type": "LT",
        "color": "#6366F1",
        "cx": 56,
        "cy": 120,
        "rot": 135,
        "flip": false,
        "points": [
          [
            24,
            24
          ],
          [
            120,
            120
          ],
          [
            24,
            216
          ]
        ]
      },
      {
        "id": "st1",
        "type": "ST",
        "color": "#10B981",
        "cx": 72,
        "cy": 200,
        "rot": 45,
        "flip": false,
        "points": [
          [
            24,
            216
          ],
          [
            120,
            216
          ],
          [
            72,
            168
          ]
        ]
      },
      {
        "id": "st2",
        "type": "ST",
        "color": "#06B6D4",
        "cx": 152,
        "cy": 120,
        "rot": 315,
        "flip": false,
        "points": [
          [
            120,
            120
          ],
          [
            168,
            168
          ],
          [
            168,
            72
          ]
        ]
      },
      {
        "id": "sq",
        "type": "SQ",
        "color": "#A855F7",
        "cx": 120,
        "cy": 168,
        "rot": 45,
        "flip": false,
        "points": [
          [
            72,
            168
          ],
          [
            120,
            216
          ],
          [
            168,
            168
          ],
          [
            120,
            120
          ]
        ]
      },
      {
        "id": "mt",
        "type": "MT",
        "color": "#F59E0B",
        "cx": 184,
        "cy": 184,
        "rot": 180,
        "flip": false,
        "points": [
          [
            120,
            216
          ],
          [
            216,
            216
          ],
          [
            216,
            120
          ]
        ]
      },
      {
        "id": "pr",
        "type": "PR",
        "color": "#84CC16",
        "cx": 192,
        "cy": 96,
        "rot": 90,
        "flip": true,
        "points": [
          [
            168,
            72
          ],
          [
            168,
            168
          ],
          [
            216,
            120
          ],
          [
            216,
            24
          ]
        ]
      }
    ]
  },
  {
    "id": "royal_swan_l6",
    "name": "ex.tangram.puzzle.royalSwan",
    "icon": "🦢",
    "level": 6,
    "viewBox": "0 0 240 240",
    "width": 240,
    "height": 240,
    "slots": [
      {
        "id": "st1",
        "type": "ST",
        "color": "#10B981",
        "cx": 33.1,
        "cy": 33.1,
        "rot": 0,
        "flip": false,
        "points": [
          [
            24,
            24
          ],
          [
            51.4,
            24
          ],
          [
            24,
            51.4
          ]
        ]
      },
      {
        "id": "st2",
        "type": "ST",
        "color": "#06B6D4",
        "cx": 42.3,
        "cy": 42.3,
        "rot": 180,
        "flip": false,
        "points": [
          [
            24,
            51.4
          ],
          [
            51.4,
            24
          ],
          [
            51.4,
            51.4
          ]
        ]
      },
      {
        "id": "pr",
        "type": "PR",
        "color": "#84CC16",
        "cx": 37.7,
        "cy": 78.9,
        "rot": 90,
        "flip": false,
        "points": [
          [
            24,
            51.4
          ],
          [
            51.4,
            51.4
          ],
          [
            51.4,
            106.3
          ],
          [
            24,
            106.3
          ]
        ]
      },
      {
        "id": "lt1",
        "type": "LT",
        "color": "#F43F5E",
        "cx": 106.3,
        "cy": 124.6,
        "rot": 225,
        "flip": false,
        "points": [
          [
            51.4,
            106.3
          ],
          [
            161.1,
            106.3
          ],
          [
            106.3,
            161.1
          ]
        ]
      },
      {
        "id": "lt2",
        "type": "LT",
        "color": "#6366F1",
        "cx": 161.1,
        "cy": 179.4,
        "rot": 225,
        "flip": false,
        "points": [
          [
            106.3,
            161.1
          ],
          [
            216,
            161.1
          ],
          [
            161.1,
            216
          ]
        ]
      },
      {
        "id": "mt",
        "type": "MT",
        "color": "#F59E0B",
        "cx": 197.7,
        "cy": 124.6,
        "rot": 90,
        "flip": false,
        "points": [
          [
            161.1,
            106.3
          ],
          [
            216,
            161.1
          ],
          [
            216,
            106.3
          ]
        ]
      },
      {
        "id": "sq",
        "type": "SQ",
        "color": "#A855F7",
        "cx": 78.9,
        "cy": 133.7,
        "rot": 0,
        "flip": false,
        "points": [
          [
            51.4,
            106.3
          ],
          [
            106.3,
            106.3
          ],
          [
            106.3,
            161.1
          ],
          [
            51.4,
            161.1
          ]
        ]
      }
    ]
  },
  {
    "id": "galleon_l6",
    "name": "ex.tangram.puzzle.galleon",
    "icon": "⛵",
    "level": 6,
    "viewBox": "0 0 240 240",
    "width": 240,
    "height": 240,
    "slots": [
      {
        "id": "lt1",
        "type": "LT",
        "color": "#F43F5E",
        "cx": 66.7,
        "cy": 155.5,
        "rot": 225,
        "flip": false,
        "points": [
          [
            24,
            141.3
          ],
          [
            109.3,
            141.3
          ],
          [
            66.7,
            184
          ]
        ]
      },
      {
        "id": "lt2",
        "type": "LT",
        "color": "#6366F1",
        "cx": 152,
        "cy": 155.5,
        "rot": 225,
        "flip": false,
        "points": [
          [
            109.3,
            141.3
          ],
          [
            194.7,
            141.3
          ],
          [
            152,
            184
          ]
        ]
      },
      {
        "id": "pr",
        "type": "PR",
        "color": "#84CC16",
        "cx": 184,
        "cy": 162.7,
        "rot": 315,
        "flip": false,
        "points": [
          [
            152,
            184
          ],
          [
            194.7,
            141.3
          ],
          [
            216,
            141.3
          ],
          [
            173.3,
            184
          ]
        ]
      },
      {
        "id": "mt",
        "type": "MT",
        "color": "#F59E0B",
        "cx": 80.9,
        "cy": 112.9,
        "rot": 270,
        "flip": false,
        "points": [
          [
            66.7,
            141.3
          ],
          [
            66.7,
            56
          ],
          [
            109.3,
            141.3
          ]
        ]
      },
      {
        "id": "st1",
        "type": "ST",
        "color": "#10B981",
        "cx": 116.4,
        "cy": 120,
        "rot": 135,
        "flip": false,
        "points": [
          [
            109.3,
            141.3
          ],
          [
            109.3,
            98.7
          ],
          [
            130.7,
            120
          ]
        ]
      },
      {
        "id": "st2",
        "type": "ST",
        "color": "#06B6D4",
        "cx": 130.7,
        "cy": 134.2,
        "rot": 45,
        "flip": false,
        "points": [
          [
            109.3,
            141.3
          ],
          [
            130.7,
            120
          ],
          [
            152,
            141.3
          ]
        ]
      },
      {
        "id": "sq",
        "type": "SQ",
        "color": "#A855F7",
        "cx": 130.7,
        "cy": 98.7,
        "rot": 315,
        "flip": false,
        "points": [
          [
            109.3,
            98.7
          ],
          [
            130.7,
            77.3
          ],
          [
            152,
            98.7
          ],
          [
            130.7,
            120
          ]
        ]
      }
    ]
  },
  {
    "id": "giant_turtle_l6",
    "name": "ex.tangram.puzzle.turtle",
    "icon": "🐢",
    "level": 6,
    "viewBox": "0 0 240 240",
    "width": 240,
    "height": 240,
    "slots": [
      {
        "id": "sq",
        "type": "SQ",
        "color": "#A855F7",
        "cx": 120,
        "cy": 40,
        "rot": 0,
        "flip": false,
        "points": [
          [
            104,
            24
          ],
          [
            136,
            24
          ],
          [
            136,
            56
          ],
          [
            104,
            56
          ]
        ]
      },
      {
        "id": "st1",
        "type": "ST",
        "color": "#10B981",
        "cx": 50.7,
        "cy": 66.7,
        "rot": 0,
        "flip": false,
        "points": [
          [
            40,
            56
          ],
          [
            72,
            56
          ],
          [
            40,
            88
          ]
        ]
      },
      {
        "id": "st2",
        "type": "ST",
        "color": "#06B6D4",
        "cx": 189.3,
        "cy": 66.7,
        "rot": 90,
        "flip": false,
        "points": [
          [
            168,
            56
          ],
          [
            200,
            56
          ],
          [
            200,
            88
          ]
        ]
      },
      {
        "id": "lt1",
        "type": "LT",
        "color": "#F43F5E",
        "cx": 136,
        "cy": 77.3,
        "rot": 225,
        "flip": false,
        "points": [
          [
            72,
            56
          ],
          [
            200,
            56
          ],
          [
            136,
            120
          ]
        ]
      },
      {
        "id": "lt2",
        "type": "LT",
        "color": "#6366F1",
        "cx": 136,
        "cy": 141.3,
        "rot": 225,
        "flip": false,
        "points": [
          [
            72,
            120
          ],
          [
            200,
            120
          ],
          [
            136,
            184
          ]
        ]
      },
      {
        "id": "mt",
        "type": "MT",
        "color": "#F59E0B",
        "cx": 93.3,
        "cy": 162.7,
        "rot": 270,
        "flip": false,
        "points": [
          [
            72,
            120
          ],
          [
            136,
            184
          ],
          [
            72,
            184
          ]
        ]
      },
      {
        "id": "pr",
        "type": "PR",
        "color": "#84CC16",
        "cx": 128,
        "cy": 200,
        "rot": 45,
        "flip": false,
        "points": [
          [
            104,
            184
          ],
          [
            136,
            184
          ],
          [
            152,
            216
          ],
          [
            120,
            216
          ]
        ]
      }
    ]
  },
  {
    "id": "dancer_l6",
    "name": "ex.tangram.puzzle.dancer",
    "icon": "💃",
    "level": 6,
    "viewBox": "0 0 240 240",
    "width": 240,
    "height": 240,
    "slots": [
      {
        "id": "sq",
        "type": "SQ",
        "color": "#A855F7",
        "cx": 120,
        "cy": 37.7,
        "rot": 0,
        "flip": false,
        "points": [
          [
            106.3,
            24
          ],
          [
            133.7,
            24
          ],
          [
            133.7,
            51.4
          ],
          [
            106.3,
            51.4
          ]
        ]
      },
      {
        "id": "st1",
        "type": "ST",
        "color": "#10B981",
        "cx": 83.4,
        "cy": 60.6,
        "rot": 90,
        "flip": false,
        "points": [
          [
            65.1,
            51.4
          ],
          [
            92.6,
            51.4
          ],
          [
            92.6,
            78.9
          ]
        ]
      },
      {
        "id": "st2",
        "type": "ST",
        "color": "#06B6D4",
        "cx": 156.6,
        "cy": 42.3,
        "rot": 270,
        "flip": false,
        "points": [
          [
            147.4,
            24
          ],
          [
            174.9,
            51.4
          ],
          [
            147.4,
            51.4
          ]
        ]
      },
      {
        "id": "lt1",
        "type": "LT",
        "color": "#F43F5E",
        "cx": 120,
        "cy": 69.7,
        "rot": 0,
        "flip": false,
        "points": [
          [
            92.6,
            51.4
          ],
          [
            147.4,
            51.4
          ],
          [
            120,
            106.3
          ]
        ]
      },
      {
        "id": "lt2",
        "type": "LT",
        "color": "#6366F1",
        "cx": 120,
        "cy": 124.6,
        "rot": 0,
        "flip": false,
        "points": [
          [
            92.6,
            106.3
          ],
          [
            147.4,
            106.3
          ],
          [
            120,
            161.1
          ]
        ]
      },
      {
        "id": "mt",
        "type": "MT",
        "color": "#F59E0B",
        "cx": 120,
        "cy": 179.4,
        "rot": 0,
        "flip": false,
        "points": [
          [
            92.6,
            161.1
          ],
          [
            147.4,
            161.1
          ],
          [
            120,
            216
          ]
        ]
      },
      {
        "id": "pr",
        "type": "PR",
        "color": "#84CC16",
        "cx": 140.6,
        "cy": 188.6,
        "rot": 90,
        "flip": false,
        "points": [
          [
            120,
            161.1
          ],
          [
            147.4,
            161.1
          ],
          [
            161.1,
            216
          ],
          [
            133.7,
            216
          ]
        ]
      }
    ]
  },
  {
    "id": "teapot_l6",
    "name": "ex.tangram.puzzle.teapot",
    "icon": "🫖",
    "level": 6,
    "viewBox": "0 0 240 240",
    "width": 240,
    "height": 240,
    "slots": [
      {
        "id": "sq",
        "type": "SQ",
        "color": "#A855F7",
        "cx": 108,
        "cy": 84,
        "rot": 0,
        "flip": false,
        "points": [
          [
            96,
            72
          ],
          [
            120,
            72
          ],
          [
            120,
            96
          ],
          [
            96,
            96
          ]
        ]
      },
      {
        "id": "mt",
        "type": "MT",
        "color": "#F59E0B",
        "cx": 108,
        "cy": 104,
        "rot": 0,
        "flip": false,
        "points": [
          [
            72,
            96
          ],
          [
            144,
            96
          ],
          [
            108,
            120
          ]
        ]
      },
      {
        "id": "lt1",
        "type": "LT",
        "color": "#F43F5E",
        "cx": 96,
        "cy": 136,
        "rot": 225,
        "flip": false,
        "points": [
          [
            48,
            120
          ],
          [
            144,
            120
          ],
          [
            96,
            168
          ]
        ]
      },
      {
        "id": "lt2",
        "type": "LT",
        "color": "#6366F1",
        "cx": 144,
        "cy": 136,
        "rot": 225,
        "flip": false,
        "points": [
          [
            96,
            120
          ],
          [
            192,
            120
          ],
          [
            144,
            168
          ]
        ]
      },
      {
        "id": "pr",
        "type": "PR",
        "color": "#84CC16",
        "cx": 48,
        "cy": 120,
        "rot": 135,
        "flip": false,
        "points": [
          [
            48,
            96
          ],
          [
            72,
            96
          ],
          [
            48,
            144
          ],
          [
            24,
            144
          ]
        ]
      },
      {
        "id": "st1",
        "type": "ST",
        "color": "#10B981",
        "cx": 200,
        "cy": 128,
        "rot": 0,
        "flip": false,
        "points": [
          [
            192,
            120
          ],
          [
            216,
            120
          ],
          [
            192,
            144
          ]
        ]
      },
      {
        "id": "st2",
        "type": "ST",
        "color": "#06B6D4",
        "cx": 208,
        "cy": 136,
        "rot": 180,
        "flip": false,
        "points": [
          [
            192,
            144
          ],
          [
            216,
            120
          ],
          [
            216,
            144
          ]
        ]
      }
    ]
  },
  {
    "id": "runner_l7",
    "name": "ex.tangram.puzzle.runner",
    "icon": "🏃",
    "level": 7,
    "viewBox": "0 0 240 240",
    "width": 240,
    "height": 240,
    "slots": [
      {
        "id": "sq",
        "type": "SQ",
        "color": "#A855F7",
        "cx": 120,
        "cy": 37.7,
        "rot": 0,
        "flip": false,
        "points": [
          [
            106.3,
            24
          ],
          [
            133.7,
            24
          ],
          [
            133.7,
            51.4
          ],
          [
            106.3,
            51.4
          ]
        ]
      },
      {
        "id": "st1",
        "type": "ST",
        "color": "#10B981",
        "cx": 97.2,
        "cy": 60.6,
        "rot": 90,
        "flip": false,
        "points": [
          [
            78.9,
            51.4
          ],
          [
            106.3,
            51.4
          ],
          [
            106.3,
            78.9
          ]
        ]
      },
      {
        "id": "lt1",
        "type": "LT",
        "color": "#F43F5E",
        "cx": 133.7,
        "cy": 69.7,
        "rot": 0,
        "flip": false,
        "points": [
          [
            106.3,
            51.4
          ],
          [
            161.1,
            51.4
          ],
          [
            133.7,
            106.3
          ]
        ]
      },
      {
        "id": "lt2",
        "type": "LT",
        "color": "#6366F1",
        "cx": 133.7,
        "cy": 124.6,
        "rot": 0,
        "flip": false,
        "points": [
          [
            106.3,
            106.3
          ],
          [
            161.1,
            106.3
          ],
          [
            133.7,
            161.1
          ]
        ]
      },
      {
        "id": "st2",
        "type": "ST",
        "color": "#06B6D4",
        "cx": 152,
        "cy": 97.2,
        "rot": 180,
        "flip": false,
        "points": [
          [
            133.7,
            106.3
          ],
          [
            161.1,
            78.9
          ],
          [
            161.1,
            106.3
          ]
        ]
      },
      {
        "id": "mt",
        "type": "MT",
        "color": "#F59E0B",
        "cx": 78.9,
        "cy": 179.4,
        "rot": 0,
        "flip": false,
        "points": [
          [
            51.4,
            161.1
          ],
          [
            106.3,
            161.1
          ],
          [
            78.9,
            216
          ]
        ]
      },
      {
        "id": "pr",
        "type": "PR",
        "color": "#84CC16",
        "cx": 161.1,
        "cy": 188.6,
        "rot": 45,
        "flip": false,
        "points": [
          [
            133.7,
            161.1
          ],
          [
            161.1,
            161.1
          ],
          [
            188.6,
            216
          ],
          [
            161.1,
            216
          ]
        ]
      }
    ]
  },
  {
    "id": "tiger_l7",
    "name": "ex.tangram.puzzle.tiger",
    "icon": "🐅",
    "level": 7,
    "viewBox": "0 0 240 240",
    "width": 240,
    "height": 240,
    "slots": [
      {
        "id": "st1",
        "type": "ST",
        "color": "#10B981",
        "cx": 31.1,
        "cy": 73.8,
        "rot": 0,
        "flip": false,
        "points": [
          [
            24,
            66.7
          ],
          [
            45.3,
            66.7
          ],
          [
            24,
            88
          ]
        ]
      },
      {
        "id": "st2",
        "type": "ST",
        "color": "#06B6D4",
        "cx": 52.4,
        "cy": 73.8,
        "rot": 0,
        "flip": false,
        "points": [
          [
            45.3,
            66.7
          ],
          [
            66.7,
            66.7
          ],
          [
            45.3,
            88
          ]
        ]
      },
      {
        "id": "sq",
        "type": "SQ",
        "color": "#A855F7",
        "cx": 45.4,
        "cy": 109.4,
        "rot": 0,
        "flip": false,
        "points": [
          [
            24,
            88
          ],
          [
            66.7,
            88
          ],
          [
            66.7,
            130.7
          ],
          [
            24,
            130.7
          ]
        ]
      },
      {
        "id": "lt1",
        "type": "LT",
        "color": "#F43F5E",
        "cx": 109.3,
        "cy": 102.2,
        "rot": 225,
        "flip": false,
        "points": [
          [
            66.7,
            88
          ],
          [
            152,
            88
          ],
          [
            109.3,
            130.7
          ]
        ]
      },
      {
        "id": "lt2",
        "type": "LT",
        "color": "#6366F1",
        "cx": 152,
        "cy": 144.9,
        "rot": 225,
        "flip": false,
        "points": [
          [
            109.3,
            130.7
          ],
          [
            194.7,
            130.7
          ],
          [
            152,
            173.3
          ]
        ]
      },
      {
        "id": "mt",
        "type": "MT",
        "color": "#F59E0B",
        "cx": 88,
        "cy": 144.9,
        "rot": 0,
        "flip": false,
        "points": [
          [
            66.7,
            130.7
          ],
          [
            109.3,
            130.7
          ],
          [
            88,
            173.3
          ]
        ]
      },
      {
        "id": "pr",
        "type": "PR",
        "color": "#84CC16",
        "cx": 205.4,
        "cy": 141.3,
        "rot": 90,
        "flip": false,
        "points": [
          [
            194.7,
            130.7
          ],
          [
            216,
            109.3
          ],
          [
            216,
            152
          ],
          [
            194.7,
            173.3
          ]
        ]
      }
    ]
  },
  {
    "id": "rabbit_l7",
    "name": "ex.tangram.puzzle.rabbit",
    "icon": "🐇",
    "level": 7,
    "viewBox": "0 0 240 240",
    "width": 240,
    "height": 240,
    "slots": [
      {
        "id": "st1",
        "type": "ST",
        "color": "#10B981",
        "cx": 40,
        "cy": 34.7,
        "rot": 0,
        "flip": false,
        "points": [
          [
            24,
            24
          ],
          [
            56,
            24
          ],
          [
            40,
            56
          ]
        ]
      },
      {
        "id": "st2",
        "type": "ST",
        "color": "#06B6D4",
        "cx": 72,
        "cy": 34.7,
        "rot": 0,
        "flip": false,
        "points": [
          [
            56,
            24
          ],
          [
            88,
            24
          ],
          [
            72,
            56
          ]
        ]
      },
      {
        "id": "sq",
        "type": "SQ",
        "color": "#A855F7",
        "cx": 56,
        "cy": 72,
        "rot": 0,
        "flip": false,
        "points": [
          [
            40,
            56
          ],
          [
            72,
            56
          ],
          [
            72,
            88
          ],
          [
            40,
            88
          ]
        ]
      },
      {
        "id": "mt",
        "type": "MT",
        "color": "#F59E0B",
        "cx": 56,
        "cy": 109.3,
        "rot": 0,
        "flip": false,
        "points": [
          [
            24,
            88
          ],
          [
            88,
            88
          ],
          [
            56,
            152
          ]
        ]
      },
      {
        "id": "lt1",
        "type": "LT",
        "color": "#F43F5E",
        "cx": 120,
        "cy": 109.3,
        "rot": 225,
        "flip": false,
        "points": [
          [
            56,
            88
          ],
          [
            184,
            88
          ],
          [
            120,
            152
          ]
        ]
      },
      {
        "id": "lt2",
        "type": "LT",
        "color": "#6366F1",
        "cx": 120,
        "cy": 173.3,
        "rot": 225,
        "flip": false,
        "points": [
          [
            56,
            152
          ],
          [
            184,
            152
          ],
          [
            120,
            216
          ]
        ]
      },
      {
        "id": "pr",
        "type": "PR",
        "color": "#84CC16",
        "cx": 168,
        "cy": 168,
        "rot": 0,
        "flip": false,
        "points": [
          [
            120,
            152
          ],
          [
            184,
            152
          ],
          [
            216,
            184
          ],
          [
            152,
            184
          ]
        ]
      }
    ]
  },
  {
    "id": "jet_l7",
    "name": "ex.tangram.puzzle.jet",
    "icon": "✈️",
    "level": 7,
    "viewBox": "0 0 240 240",
    "width": 240,
    "height": 240,
    "slots": [
      {
        "id": "st1",
        "type": "ST",
        "color": "#10B981",
        "cx": 120,
        "cy": 33.1,
        "rot": 0,
        "flip": false,
        "points": [
          [
            106.3,
            24
          ],
          [
            133.7,
            24
          ],
          [
            120,
            51.4
          ]
        ]
      },
      {
        "id": "sq",
        "type": "SQ",
        "color": "#A855F7",
        "cx": 120,
        "cy": 65.2,
        "rot": 0,
        "flip": false,
        "points": [
          [
            106.3,
            51.4
          ],
          [
            133.7,
            51.4
          ],
          [
            133.7,
            78.9
          ],
          [
            106.3,
            78.9
          ]
        ]
      },
      {
        "id": "lt1",
        "type": "LT",
        "color": "#F43F5E",
        "cx": 101.7,
        "cy": 97.2,
        "rot": 90,
        "flip": false,
        "points": [
          [
            65.1,
            78.9
          ],
          [
            120,
            78.9
          ],
          [
            120,
            133.7
          ]
        ]
      },
      {
        "id": "lt2",
        "type": "LT",
        "color": "#6366F1",
        "cx": 138.3,
        "cy": 97.2,
        "rot": 0,
        "flip": false,
        "points": [
          [
            120,
            78.9
          ],
          [
            174.9,
            78.9
          ],
          [
            120,
            133.7
          ]
        ]
      },
      {
        "id": "mt",
        "type": "MT",
        "color": "#F59E0B",
        "cx": 120,
        "cy": 142.8,
        "rot": 225,
        "flip": false,
        "points": [
          [
            92.6,
            133.7
          ],
          [
            147.4,
            133.7
          ],
          [
            120,
            161.1
          ]
        ]
      },
      {
        "id": "st2",
        "type": "ST",
        "color": "#06B6D4",
        "cx": 120,
        "cy": 170.3,
        "rot": 0,
        "flip": false,
        "points": [
          [
            106.3,
            161.1
          ],
          [
            133.7,
            161.1
          ],
          [
            120,
            188.6
          ]
        ]
      },
      {
        "id": "pr",
        "type": "PR",
        "color": "#84CC16",
        "cx": 113.2,
        "cy": 202.3,
        "rot": 45,
        "flip": false,
        "points": [
          [
            92.6,
            188.6
          ],
          [
            120,
            188.6
          ],
          [
            133.7,
            216
          ],
          [
            106.3,
            216
          ]
        ]
      }
    ]
  },
  {
    "id": "pagoda_l7",
    "name": "ex.tangram.puzzle.pagoda",
    "icon": "🏯",
    "level": 7,
    "viewBox": "0 0 240 240",
    "width": 240,
    "height": 240,
    "slots": [
      {
        "id": "st1",
        "type": "ST",
        "color": "#10B981",
        "cx": 120,
        "cy": 32,
        "rot": 0,
        "flip": false,
        "points": [
          [
            108,
            24
          ],
          [
            132,
            24
          ],
          [
            120,
            48
          ]
        ]
      },
      {
        "id": "st2",
        "type": "ST",
        "color": "#06B6D4",
        "cx": 120,
        "cy": 56,
        "rot": 225,
        "flip": false,
        "points": [
          [
            96,
            48
          ],
          [
            144,
            48
          ],
          [
            120,
            72
          ]
        ]
      },
      {
        "id": "mt",
        "type": "MT",
        "color": "#F59E0B",
        "cx": 120,
        "cy": 80,
        "rot": 0,
        "flip": false,
        "points": [
          [
            72,
            72
          ],
          [
            168,
            72
          ],
          [
            120,
            96
          ]
        ]
      },
      {
        "id": "sq",
        "type": "SQ",
        "color": "#A855F7",
        "cx": 120,
        "cy": 120,
        "rot": 0,
        "flip": false,
        "points": [
          [
            96,
            96
          ],
          [
            144,
            96
          ],
          [
            144,
            144
          ],
          [
            96,
            144
          ]
        ]
      },
      {
        "id": "lt1",
        "type": "LT",
        "color": "#F43F5E",
        "cx": 96,
        "cy": 160,
        "rot": 225,
        "flip": false,
        "points": [
          [
            48,
            144
          ],
          [
            144,
            144
          ],
          [
            96,
            192
          ]
        ]
      },
      {
        "id": "lt2",
        "type": "LT",
        "color": "#6366F1",
        "cx": 144,
        "cy": 160,
        "rot": 225,
        "flip": false,
        "points": [
          [
            96,
            144
          ],
          [
            192,
            144
          ],
          [
            144,
            192
          ]
        ]
      },
      {
        "id": "pr",
        "type": "PR",
        "color": "#84CC16",
        "cx": 132,
        "cy": 204,
        "rot": 0,
        "flip": false,
        "points": [
          [
            96,
            192
          ],
          [
            144,
            192
          ],
          [
            168,
            216
          ],
          [
            120,
            216
          ]
        ]
      }
    ]
  },
  {
    "id": "wind_sail_l7",
    "name": "ex.tangram.puzzle.windSail",
    "icon": "⛵",
    "level": 7,
    "viewBox": "0 0 240 240",
    "width": 240,
    "height": 240,
    "slots": [
      {
        "id": "lt1",
        "type": "LT",
        "color": "#F43F5E",
        "cx": 78.9,
        "cy": 152,
        "rot": 225,
        "flip": false,
        "points": [
          [
            24,
            133.7
          ],
          [
            133.7,
            133.7
          ],
          [
            78.9,
            188.6
          ]
        ]
      },
      {
        "id": "lt2",
        "type": "LT",
        "color": "#6366F1",
        "cx": 97.2,
        "cy": 97.1,
        "rot": 270,
        "flip": false,
        "points": [
          [
            78.9,
            133.7
          ],
          [
            78.9,
            24
          ],
          [
            133.7,
            133.7
          ]
        ]
      },
      {
        "id": "mt",
        "type": "MT",
        "color": "#F59E0B",
        "cx": 60.6,
        "cy": 115.4,
        "rot": 180,
        "flip": false,
        "points": [
          [
            24,
            133.7
          ],
          [
            78.9,
            78.9
          ],
          [
            78.9,
            133.7
          ]
        ]
      },
      {
        "id": "sq",
        "type": "SQ",
        "color": "#A855F7",
        "cx": 161.1,
        "cy": 133.7,
        "rot": 315,
        "flip": false,
        "points": [
          [
            133.7,
            133.7
          ],
          [
            161.1,
            106.3
          ],
          [
            188.6,
            133.7
          ],
          [
            161.1,
            161.1
          ]
        ]
      },
      {
        "id": "st1",
        "type": "ST",
        "color": "#10B981",
        "cx": 106.3,
        "cy": 197.7,
        "rot": 225,
        "flip": false,
        "points": [
          [
            78.9,
            188.6
          ],
          [
            133.7,
            188.6
          ],
          [
            106.3,
            216
          ]
        ]
      },
      {
        "id": "st2",
        "type": "ST",
        "color": "#06B6D4",
        "cx": 161.1,
        "cy": 197.7,
        "rot": 225,
        "flip": false,
        "points": [
          [
            133.7,
            188.6
          ],
          [
            188.6,
            188.6
          ],
          [
            161.1,
            216
          ]
        ]
      },
      {
        "id": "pr",
        "type": "PR",
        "color": "#84CC16",
        "cx": 174.9,
        "cy": 161.2,
        "rot": 45,
        "flip": false,
        "points": [
          [
            133.7,
            133.7
          ],
          [
            188.6,
            133.7
          ],
          [
            216,
            188.6
          ],
          [
            161.1,
            188.6
          ]
        ]
      }
    ]
  },
  {
    "id": "eagle_l8",
    "name": "ex.tangram.puzzle.eagle",
    "icon": "🦅",
    "level": 8,
    "viewBox": "0 0 240 240",
    "width": 240,
    "height": 240,
    "slots": [
      {
        "id": "st1",
        "type": "ST",
        "color": "#10B981",
        "cx": 128,
        "cy": 40,
        "rot": 270,
        "flip": false,
        "points": [
          [
            120,
            24
          ],
          [
            144,
            48
          ],
          [
            120,
            48
          ]
        ]
      },
      {
        "id": "sq",
        "type": "SQ",
        "color": "#A855F7",
        "cx": 120,
        "cy": 60,
        "rot": 0,
        "flip": false,
        "points": [
          [
            108,
            48
          ],
          [
            132,
            48
          ],
          [
            132,
            72
          ],
          [
            108,
            72
          ]
        ]
      },
      {
        "id": "lt1",
        "type": "LT",
        "color": "#F43F5E",
        "cx": 96,
        "cy": 96,
        "rot": 90,
        "flip": false,
        "points": [
          [
            48,
            72
          ],
          [
            120,
            72
          ],
          [
            120,
            144
          ]
        ]
      },
      {
        "id": "lt2",
        "type": "LT",
        "color": "#6366F1",
        "cx": 144,
        "cy": 96,
        "rot": 0,
        "flip": false,
        "points": [
          [
            120,
            72
          ],
          [
            192,
            72
          ],
          [
            120,
            144
          ]
        ]
      },
      {
        "id": "mt",
        "type": "MT",
        "color": "#F59E0B",
        "cx": 120,
        "cy": 160,
        "rot": 0,
        "flip": false,
        "points": [
          [
            96,
            144
          ],
          [
            144,
            144
          ],
          [
            120,
            192
          ]
        ]
      },
      {
        "id": "st2",
        "type": "ST",
        "color": "#06B6D4",
        "cx": 120,
        "cy": 200,
        "rot": 0,
        "flip": false,
        "points": [
          [
            108,
            192
          ],
          [
            132,
            192
          ],
          [
            120,
            216
          ]
        ]
      },
      {
        "id": "pr",
        "type": "PR",
        "color": "#84CC16",
        "cx": 60,
        "cy": 84,
        "rot": 90,
        "flip": false,
        "points": [
          [
            48,
            72
          ],
          [
            72,
            48
          ],
          [
            72,
            96
          ],
          [
            48,
            120
          ]
        ]
      }
    ]
  },
  {
    "id": "monk_l8",
    "name": "ex.tangram.puzzle.monk",
    "icon": "🧘",
    "level": 8,
    "viewBox": "0 0 240 240",
    "width": 240,
    "height": 240,
    "slots": [
      {
        "id": "sq",
        "type": "SQ",
        "color": "#A855F7",
        "cx": 106.3,
        "cy": 37.7,
        "rot": 0,
        "flip": false,
        "points": [
          [
            92.6,
            24
          ],
          [
            120,
            24
          ],
          [
            120,
            51.4
          ],
          [
            92.6,
            51.4
          ]
        ]
      },
      {
        "id": "st1",
        "type": "ST",
        "color": "#10B981",
        "cx": 83.4,
        "cy": 60.6,
        "rot": 90,
        "flip": false,
        "points": [
          [
            65.1,
            51.4
          ],
          [
            92.6,
            51.4
          ],
          [
            92.6,
            78.9
          ]
        ]
      },
      {
        "id": "st2",
        "type": "ST",
        "color": "#06B6D4",
        "cx": 129.1,
        "cy": 60.6,
        "rot": 0,
        "flip": false,
        "points": [
          [
            120,
            51.4
          ],
          [
            147.4,
            51.4
          ],
          [
            120,
            78.9
          ]
        ]
      },
      {
        "id": "lt1",
        "type": "LT",
        "color": "#F43F5E",
        "cx": 106.3,
        "cy": 97.2,
        "rot": 0,
        "flip": false,
        "points": [
          [
            65.1,
            78.9
          ],
          [
            147.4,
            78.9
          ],
          [
            106.3,
            133.7
          ]
        ]
      },
      {
        "id": "lt2",
        "type": "LT",
        "color": "#6366F1",
        "cx": 92.6,
        "cy": 152,
        "rot": 225,
        "flip": false,
        "points": [
          [
            37.7,
            133.7
          ],
          [
            147.4,
            133.7
          ],
          [
            92.6,
            188.6
          ]
        ]
      },
      {
        "id": "mt",
        "type": "MT",
        "color": "#F59E0B",
        "cx": 147.4,
        "cy": 152,
        "rot": 225,
        "flip": false,
        "points": [
          [
            92.6,
            133.7
          ],
          [
            202.3,
            133.7
          ],
          [
            147.4,
            188.6
          ]
        ]
      },
      {
        "id": "pr",
        "type": "PR",
        "color": "#84CC16",
        "cx": 78.9,
        "cy": 202.3,
        "rot": 0,
        "flip": false,
        "points": [
          [
            37.7,
            188.6
          ],
          [
            92.6,
            188.6
          ],
          [
            120,
            216
          ],
          [
            65.1,
            216
          ]
        ]
      }
    ]
  },
  {
    "id": "dragon_l8",
    "name": "ex.tangram.puzzle.dragon",
    "icon": "🐉",
    "level": 8,
    "viewBox": "0 0 240 240",
    "width": 240,
    "height": 240,
    "slots": [
      {
        "id": "st1",
        "type": "ST",
        "color": "#10B981",
        "cx": 32,
        "cy": 56,
        "rot": 0,
        "flip": false,
        "points": [
          [
            24,
            48
          ],
          [
            48,
            48
          ],
          [
            24,
            72
          ]
        ]
      },
      {
        "id": "sq",
        "type": "SQ",
        "color": "#A855F7",
        "cx": 36,
        "cy": 84,
        "rot": 0,
        "flip": false,
        "points": [
          [
            24,
            72
          ],
          [
            48,
            72
          ],
          [
            48,
            96
          ],
          [
            24,
            96
          ]
        ]
      },
      {
        "id": "st2",
        "type": "ST",
        "color": "#06B6D4",
        "cx": 64,
        "cy": 64,
        "rot": 180,
        "flip": false,
        "points": [
          [
            48,
            72
          ],
          [
            72,
            48
          ],
          [
            72,
            72
          ]
        ]
      },
      {
        "id": "lt1",
        "type": "LT",
        "color": "#F43F5E",
        "cx": 96,
        "cy": 112,
        "rot": 225,
        "flip": false,
        "points": [
          [
            48,
            96
          ],
          [
            144,
            96
          ],
          [
            96,
            144
          ]
        ]
      },
      {
        "id": "lt2",
        "type": "LT",
        "color": "#6366F1",
        "cx": 112,
        "cy": 96,
        "rot": 135,
        "flip": false,
        "points": [
          [
            96,
            48
          ],
          [
            96,
            144
          ],
          [
            144,
            96
          ]
        ]
      },
      {
        "id": "mt",
        "type": "MT",
        "color": "#F59E0B",
        "cx": 120,
        "cy": 160,
        "rot": 0,
        "flip": false,
        "points": [
          [
            96,
            144
          ],
          [
            144,
            144
          ],
          [
            120,
            192
          ]
        ]
      },
      {
        "id": "pr",
        "type": "PR",
        "color": "#84CC16",
        "cx": 180,
        "cy": 168,
        "rot": 45,
        "flip": false,
        "points": [
          [
            144,
            144
          ],
          [
            192,
            144
          ],
          [
            216,
            192
          ],
          [
            168,
            192
          ]
        ]
      }
    ]
  },
  {
    "id": "stretch_cat_l8",
    "name": "ex.tangram.puzzle.stretchCat",
    "icon": "🐈",
    "level": 8,
    "viewBox": "0 0 240 240",
    "width": 240,
    "height": 240,
    "slots": [
      {
        "id": "st1",
        "type": "ST",
        "color": "#10B981",
        "cx": 38.2,
        "cy": 80.9,
        "rot": 180,
        "flip": false,
        "points": [
          [
            24,
            88
          ],
          [
            45.3,
            66.7
          ],
          [
            45.3,
            88
          ]
        ]
      },
      {
        "id": "st2",
        "type": "ST",
        "color": "#06B6D4",
        "cx": 52.4,
        "cy": 80.9,
        "rot": 270,
        "flip": false,
        "points": [
          [
            45.3,
            88
          ],
          [
            45.3,
            66.7
          ],
          [
            66.7,
            88
          ]
        ]
      },
      {
        "id": "sq",
        "type": "SQ",
        "color": "#A855F7",
        "cx": 45.4,
        "cy": 109.4,
        "rot": 0,
        "flip": false,
        "points": [
          [
            24,
            88
          ],
          [
            66.7,
            88
          ],
          [
            66.7,
            130.7
          ],
          [
            24,
            130.7
          ]
        ]
      },
      {
        "id": "lt1",
        "type": "LT",
        "color": "#F43F5E",
        "cx": 109.3,
        "cy": 102.2,
        "rot": 225,
        "flip": false,
        "points": [
          [
            66.7,
            88
          ],
          [
            152,
            88
          ],
          [
            109.3,
            130.7
          ]
        ]
      },
      {
        "id": "lt2",
        "type": "LT",
        "color": "#6366F1",
        "cx": 152,
        "cy": 144.9,
        "rot": 225,
        "flip": false,
        "points": [
          [
            109.3,
            130.7
          ],
          [
            194.7,
            130.7
          ],
          [
            152,
            173.3
          ]
        ]
      },
      {
        "id": "mt",
        "type": "MT",
        "color": "#F59E0B",
        "cx": 88,
        "cy": 144.9,
        "rot": 0,
        "flip": false,
        "points": [
          [
            66.7,
            130.7
          ],
          [
            109.3,
            130.7
          ],
          [
            88,
            173.3
          ]
        ]
      },
      {
        "id": "pr",
        "type": "PR",
        "color": "#84CC16",
        "cx": 205.4,
        "cy": 141.3,
        "rot": 90,
        "flip": false,
        "points": [
          [
            194.7,
            130.7
          ],
          [
            216,
            109.3
          ],
          [
            216,
            152
          ],
          [
            194.7,
            173.3
          ]
        ]
      }
    ]
  },
  {
    "id": "horse_l8",
    "name": "ex.tangram.puzzle.horse",
    "icon": "🐎",
    "level": 8,
    "viewBox": "0 0 240 240",
    "width": 240,
    "height": 240,
    "slots": [
      {
        "id": "st1",
        "type": "ST",
        "color": "#10B981",
        "cx": 36,
        "cy": 32,
        "rot": 0,
        "flip": false,
        "points": [
          [
            24,
            24
          ],
          [
            48,
            24
          ],
          [
            36,
            48
          ]
        ]
      },
      {
        "id": "sq",
        "type": "SQ",
        "color": "#A855F7",
        "cx": 48,
        "cy": 60,
        "rot": 0,
        "flip": false,
        "points": [
          [
            36,
            48
          ],
          [
            60,
            48
          ],
          [
            60,
            72
          ],
          [
            36,
            72
          ]
        ]
      },
      {
        "id": "st2",
        "type": "ST",
        "color": "#06B6D4",
        "cx": 68,
        "cy": 56,
        "rot": 0,
        "flip": false,
        "points": [
          [
            60,
            48
          ],
          [
            84,
            48
          ],
          [
            60,
            72
          ]
        ]
      },
      {
        "id": "lt1",
        "type": "LT",
        "color": "#F43F5E",
        "cx": 96,
        "cy": 88,
        "rot": 225,
        "flip": false,
        "points": [
          [
            48,
            72
          ],
          [
            144,
            72
          ],
          [
            96,
            120
          ]
        ]
      },
      {
        "id": "lt2",
        "type": "LT",
        "color": "#6366F1",
        "cx": 144,
        "cy": 136,
        "rot": 225,
        "flip": false,
        "points": [
          [
            96,
            120
          ],
          [
            192,
            120
          ],
          [
            144,
            168
          ]
        ]
      },
      {
        "id": "mt",
        "type": "MT",
        "color": "#F59E0B",
        "cx": 48,
        "cy": 136,
        "rot": 0,
        "flip": false,
        "points": [
          [
            24,
            120
          ],
          [
            72,
            120
          ],
          [
            48,
            168
          ]
        ]
      },
      {
        "id": "pr",
        "type": "PR",
        "color": "#84CC16",
        "cx": 180,
        "cy": 192,
        "rot": 45,
        "flip": false,
        "points": [
          [
            144,
            168
          ],
          [
            192,
            168
          ],
          [
            216,
            216
          ],
          [
            168,
            216
          ]
        ]
      }
    ]
  },
  {
    "id": "castle_l8",
    "name": "ex.tangram.puzzle.castle",
    "icon": "🏰",
    "level": 8,
    "viewBox": "0 0 240 240",
    "width": 240,
    "height": 240,
    "slots": [
      {
        "id": "st1",
        "type": "ST",
        "color": "#10B981",
        "cx": 40,
        "cy": 50.7,
        "rot": 0,
        "flip": false,
        "points": [
          [
            24,
            40
          ],
          [
            56,
            40
          ],
          [
            40,
            72
          ]
        ]
      },
      {
        "id": "st2",
        "type": "ST",
        "color": "#06B6D4",
        "cx": 136,
        "cy": 50.7,
        "rot": 0,
        "flip": false,
        "points": [
          [
            120,
            40
          ],
          [
            152,
            40
          ],
          [
            136,
            72
          ]
        ]
      },
      {
        "id": "sq",
        "type": "SQ",
        "color": "#A855F7",
        "cx": 40,
        "cy": 88,
        "rot": 0,
        "flip": false,
        "points": [
          [
            24,
            72
          ],
          [
            56,
            72
          ],
          [
            56,
            104
          ],
          [
            24,
            104
          ]
        ]
      },
      {
        "id": "mt",
        "type": "MT",
        "color": "#F59E0B",
        "cx": 88,
        "cy": 50.7,
        "rot": 225,
        "flip": false,
        "points": [
          [
            56,
            40
          ],
          [
            120,
            40
          ],
          [
            88,
            72
          ]
        ]
      },
      {
        "id": "lt1",
        "type": "LT",
        "color": "#F43F5E",
        "cx": 88,
        "cy": 125.3,
        "rot": 225,
        "flip": false,
        "points": [
          [
            24,
            104
          ],
          [
            152,
            104
          ],
          [
            88,
            168
          ]
        ]
      },
      {
        "id": "lt2",
        "type": "LT",
        "color": "#6366F1",
        "cx": 152,
        "cy": 125.3,
        "rot": 225,
        "flip": false,
        "points": [
          [
            88,
            104
          ],
          [
            216,
            104
          ],
          [
            152,
            168
          ]
        ]
      },
      {
        "id": "pr",
        "type": "PR",
        "color": "#84CC16",
        "cx": 104,
        "cy": 184,
        "rot": 0,
        "flip": false,
        "points": [
          [
            56,
            168
          ],
          [
            120,
            168
          ],
          [
            152,
            200
          ],
          [
            88,
            200
          ]
        ]
      }
    ]
  }
];
