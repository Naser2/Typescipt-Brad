export class Card {
  // Nasser's Notes: class Card

  private static suits: string[] = ['h', 's', 'd', 'c']; // Nasser's: Declared, Annotated and assigned suits to a array accepting string

  private static ranks: string[] = [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'T',
    'J',
    'Q',
    'K',
    'A'
  ]; // Nasser: Declared, Annotated and assigned raks to an array accepting string

  constructor(private _rank: Rank, private _suit: Suit) {
    // Nasser's Notes: passed in variables of datatype Rank & Suit
    if (this._rank >= Card.ranks.length)
      // Nasser: if rank is greater than the Cardd's length throw err
      throw Error('A rank must be 0 and 12. ( Ace to king)');
    if (this._suit >= Card.suits.length)
      // Nasser: if suit is greater than the Crad's length throw err
      throw Error('A suit must be between 0 and 3 (h, s, d, c)');
  }

  toString() {
    // Nasser: this method return a string of combined card of rank & suit example: 'h2'
    return Card.ranks[this._rank] + Card.suits[this._suit];
  }

  static sortFn(a: Card, b: Card) {
    return b.rank - a.rank; // Nasser: returns Card 'b' rank - Card 'a'rank ex:
    //const a = new Card(2, h)
    //const b = new Card(3, t)
    //b -a
    //3 - 2
  }

  get suit() {
    // Nasser's Notes: returns a getter of suit
    return this._suit;
  }

  get rank() {
    // Nasser's Notes: returns a getter of rank
    return this._rank;
  }

  // transfor 4d, 7s type of strings to a new Card
  static fromString(str: string) {
    // Nasser's Notes: static method to the class Card
    if (str.length !== 2)
      // Nasser's Notes: throw error if length is not equal to 2
      throw Error('Card length should be 2');

    const rank = Card.ranks.findIndex(x => x === str[0]); // Nasser: reffer line 15th ex: 'h2'[0]=h
    const suit = Card.suits.findIndex(x => x === str[1]); // Nasser: reffer line 15th ex: 'h2'[1]=2

    if (rank === -1 || suit === -1)
      // Nasser: If suit or rank is not found trhow error bellow
      throw Error(`Rank ${str[0]} or suit ${str[1]} was not found`); // Nasser: ? these items ex: 'h' and suit '2' was not found

    return new Card(rank, suit); // Nasser: return a new card instance instead from string
  }
}
// const a = new Card(..,...)
// const b = new Card(..,...)
// cards = [a,b]

// the Hand class contains the player cards + board cards.
export class Hand {
  public cards: Card[] = []; // Nasser: annotate cards as an array && assign to an empty array of cards and defaults as public variable

  // those two are used when evaluating a hand
  // take a look at evaluate hand for more details
  public suits: Card[][] = new Array(4).fill(0).map(_ => []); // Nasser: inline annotation and assignment of suits mapped and returnwith 4 empty arrays?
  public ranks: Card[][] = new Array(13).fill(0).map(_ => []); // Nasser: inline annotation and assignment of suits filled with 13 empty arrays

  constructor(cards: Card[] = []) {
    // Nasser: assigned a default value of an empty array to prevent app from breaking if nothing is passed when extentiated
    cards.forEach(card => this.addCard(card));
  }

  addCard(card: Card): Hand {
    // Nasser: pass each card to 'addCard' which should return a 'Hand'
    if (this.cards.length > 7)
      // Nasser: If cards' length is greater than 7 throw error below
      throw Error(
        "Hand containing board card must have max 7 cards. This is Hold'em"
      );
    // precautious check to see that we can actually add the card (there shouldn't be two Ad in a deck for example)
    if (this.cards.some(c => c.toString() === card.toString()))
      // Nasser: prevents the same card from being added twice example: '2h' ===='2h'?
      throw Error('This card has already been added to this hand!');

    this.cards.push(card); //Nasser: adds card to cards array

    // we are adding the suit and ranks to their respective array so we can easily
    // evaluate those.
    this.suits[card.suit].push(card); //Nasser's ex: we have this   [[],[],[],[]] = 4 arrays
    this.ranks[card.rank].push(card); //Nasser's here we have 13 arrays
    return this; // Nasser: returns type of Hand
  }

  evaluateHand() {
    // in hold'em poker there is 5 cards on board + 2 cards in hand.
    // for convenience, the Hand class contains the board cards as well
    if (this.cards.length < 7)
      // Nasser: If cards' length is less than 7 throw error below
      throw new Error('When evaluating a hand, the hand must have 7 cards');
  }

  hasRank(rank: Rank) {
    return this.ranks[rank].length > 0; // Nasser: chacks to see if cards' length is less than 0 - Returns a boolean
  }

  // gives back a string representation of the hand of the form: 7d 6h 8s Js 9s Td As
  toString() {
    return this.cards.toString().replace(/,/g, ' ');
  }

  static fromString(str: String): Hand {
    // reconverting to extantiate class of 'Hand'
    const hand = new Hand();
    const cardsStr = str.split(' ');
    cardsStr.forEach(cardStr => {
      const card = Card.fromString(cardStr);
      hand.addCard(card);
    });
    return hand;
  }
}

export class HandEvaluator {
  evaluateHand(hand: Hand): WinningHand {
    //Nasser's: takes a hand returns datatype of WinningHand
    let winningCards: Card[] | undefined; //Nasser's: accepts an array of Card or 'undefined '
    if ((winningCards = this.evaluateRoyalFlush(hand)))
      return new WinningHand(winningCards, HandRank.ROYAL_FLUSH);
    if ((winningCards = this.evaluateStraightFlush(hand)))
      return new WinningHand(winningCards, HandRank.STRAIGHT_FLUSH);
    else if ((winningCards = this.evaluateFourOfAKind(hand)))
      return new WinningHand(winningCards, HandRank.FOUR_OF_A_KIND);
    else if ((winningCards = this.evaluateFullHouse(hand)))
      return new WinningHand(winningCards, HandRank.FULL_HOUSE);
    else if ((winningCards = this.evaluateFlush(hand)))
      return new WinningHand(winningCards, HandRank.FLUSH);
    else if ((winningCards = this.evaluateStraight(hand)))
      return new WinningHand(winningCards, HandRank.STRAIGHT);
    else if ((winningCards = this.evaluateSet(hand)))
      return new WinningHand(winningCards, HandRank.SET);
    else if ((winningCards = this.evaluateDoublePair(hand)))
      return new WinningHand(winningCards, HandRank.DOUBLE_PAIR);
    else if ((winningCards = this.evaluatePair(hand)))
      return new WinningHand(winningCards, HandRank.PAIR);
    else
      return new WinningHand(
        this.findHighests(5, hand.cards), //Nasser's: creates 5 WinningHand by callimg findHighests
        HandRank.HIGH_CARD
      );
  }

  evaluateRoyalFlush(hand: Hand): Card[] | undefined {
    const straightFlush = this.evaluateStraightFlush(hand);
    if (straightFlush) {
      const sfHand = new Hand(straightFlush);
      if (sfHand.hasRank(Rank.ACE) && sfHand.hasRank(Rank.KING))
        return sfHand.cards;
    }
  }

  evaluateStraightFlush(hand: Hand): Card[] | undefined {
    // Nasser's: takes a hand returns an array of cards or undefined
    let flush: any = this.evaluateFlush(hand, 7); // Nassers':calls evaluteFlush which returns 5 of the highest amount
    let straightFlush;
    if (flush) {
      straightFlush = this.evaluateStraight(new Hand(flush)); // Nassers': straightFlush = cards'length is greater than 5
    }
    return straightFlush;
  }

  // returns the biggest flush in a Hand
  evaluateFlush(hand: Hand, amount: number = 5): Card[] | undefined {
    // we need to remove other cards
    // originally the Suit is an enum but it's converted to a number
    // by typescript under the hood
    const flushCards = hand.suits.find(cardArr => cardArr.length >= 5);
    if (flushCards) return this.findHighests(amount, flushCards); // Nassers': returns 5 of the highest amount
  }

  evaluateStraight(hand: Hand): Card[] | undefined {
    let consecutives: Card[] = [];
    const length = hand.ranks.length;
    // for A2345 we put the A already in the consecutive array
    if (hand.hasRank(Rank.ACE)) consecutives.push(hand.ranks[Rank.ACE][0]);

    // we loop through each rank in hand, if we find a group of card
    // we push the first one of the group into consecutives
    // if there is no card at said rank we reset consecutives.
    for (let i = 0; i < length; i++) {
      // we are only sure there is at least one card at that rank
      if (hand.hasRank(i)) consecutives.push(hand.ranks[i][0]);
      else consecutives = [];
      // if we have 5 consecutives cards we still need to check
      // that there isn't anymore after
      if (consecutives.length >= 5) {
        const nextCards = hand.ranks[i + 1];
        if (nextCards && nextCards.length === 0) {
          break;
        }
      }
    }
    if (consecutives.length >= 5) return consecutives.reverse().slice(0, 5);
  }

  evaluateFullHouse(hand: Hand): Card[] | undefined {
    const set = this.findHighestArr(3, hand);
    if (set) {
      const pair = this.findHighestArr(2, hand, set[0]);
      if (pair) return [...set, ...pair];
    }
  }

  evaluateFourOfAKind(hand: Hand): Card[] | undefined {
    const four = hand.ranks.find(cardArr => cardArr.length === 4);
    if (four) {
      four.push(...this.findHighests(1, hand.cards, four));
      return four;
    }
  }

  evaluateSet(hand: Hand): Card[] | undefined {
    const set = this.findHighestArr(3, hand);
    if (set) {
      set.push(...this.findHighests(2, hand.cards, set));
      return set;
    }
  }

  evaluateDoublePair(hand: Hand): Card[] | undefined {
    const pair1 = this.findHighestArr(2, hand);
    let pair2;
    if (pair1) pair2 = this.findHighestArr(2, hand, pair1[0]);
    if (pair1 && pair2) {
      const combination = [...pair1, ...pair2];
      return [...combination, ...this.findHighests(1, hand.cards, combination)];
    }
  }

  evaluatePair(hand: Hand): Card[] | undefined {
    const pair = this.findHighestArr(2, hand);
    if (pair) {
      pair.push(...this.findHighests(3, hand.cards, pair));
      return pair;
    }
  }

  findHighestArr(
    length: number,
    hand: Hand,
    omitted?: Card
  ): Card[] | undefined {
    let ranksReverse = [...hand.ranks].reverse();
    // Nasser's Notes: reverse the 'Ranked Cards'

    // omit the ones we don't want by checking omitted rank and rank.firstcard.rank
    if (omitted)
      ranksReverse = ranksReverse.filter(
        arr => arr[0] && arr[0].rank !== omitted.rank
      ); //Nasser's Notes: filter out the omitted Card from the 'ranksReversed  Cards'

    const set = ranksReverse.find(arr => arr.length >= length);
    //Nasser's Notes:  var set =  the length equal to number passed in.
    if (set) return set.slice(0, length); 
  }

  // get x highest number of cards
  findHighests(
    amount: number,
    cards: Card[] = [],
    omitted: Card[] = []
  ): Card[] {
    // !~indexOf = not found
    const relevant = (cards.filter(c => !~omitted.indexOf(c)) as Card[]).sort(
      Card.sortFn
    );
    return relevant.slice(0, amount);
  }
}

// A hand consist of the cards the player is holding + the cards on board
// Which equals to 7 cards.
// A winning hand is the best possible combination of 5 cards from those 7 cards
export class WinningHand extends Hand {
  constructor(cards: Card[], public rank: HandRank) {
    super();
    super.cards = cards;
  }

  // If a hand has a rank of PAIR
  // we need to be able to compare it with another
  // wining hand that is also pair. Thus we need additional information,
  // like the high card, etc.
  // We will total 6 ranks
  calculateRanks(rank: HandRank) {
    // TODO  - //Nasser's: I never played this game or card games in general. However, after checking the game's logic, below is what I think should be done along my critiques.
   
    //NASSERS'S PSEUDO-CODE:
    //We need to 1 - Have a method or class to agregate the cards in different categories based on their ranks. ex: The highest rank, the highest x-of-a-kind, the highest pairs (including full house) and the best straight/flush.
    // 2- Sort the results after evaluating each category.
    
    // CRITIQUES:
    // 1- There are possibly more classes than needed to get relevant needed data
    //2- I am oblivious to the purpose of the 'evaluateHand' function in Hand which doesn't seem to actually evaluate the hand since there is a HandEvaluator. Does a Hand still need an evaluateHand function?
    //3- Here is an example of repeditively doing a task to provide some already known info: A royalFush first checks for a straight flush, then throw the result away if it doesn't match, only to then recalculate the straight flush on the next function call.
    // 4- If I had to re-write it I would simplify it.
  }
}

export enum Suit {
  HEARTH,
  SPADE,
  DIAMOND,
  CLUB
}

export enum Rank {
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
  NINE,
  TEN,
  JACK,
  QUEEN,
  KING,
  ACE
}

export enum HandRank {
  HIGH_CARD,
  PAIR,
  DOUBLE_PAIR,
  SET,
  STRAIGHT,
  FLUSH,
  FULL_HOUSE,
  FOUR_OF_A_KIND,
  STRAIGHT_FLUSH,
  ROYAL_FLUSH
}
