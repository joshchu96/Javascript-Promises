//Part 1: Number Facts
let url = "http://numbersapi.com/"

let fav_num=8;

$.getJSON(`${url}/${fav_num}/?json`)
    .then(data => console.log(data))
    .catch(err => err);

let fav_nums = [1,2,3,4,5];
$.getJSON(`${url}/${fav_nums}/?json`)
    .then(data => console.log(data))
    .catch(err => err);


Promise.all(
    Array.from({length:4}), () => {
        return $.getJSON(`${url}/${fav_num}/?json`);
    })
    .then(facts => {
        facts.forEach(data => $("body").append(`<p>${data.text}</p>`))
    });

//Part 2: Deck of Cards

let shuffledDeck_url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"

function cardFromShuffledDeck() {       
    $.getJSON(shuffledDeck_url)
        .then(data => {
            console.log(`deck is shuffled: ${data.deck_id}`);
            return $.getJSON(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=1`);
        })
        .then(res => {
            console.log(`The card you picked was the ${res.cards[0].value} of ${res.cards[0].suit}`);
            $("ul").append(`<li>${res.cards[0].value} of ${res.cards[0].suit}</li>`);
        })
        .catch(err => err)
    }

function oneMore() {
    $.getJSON(shuffledDeck_url)
        .then(data => {
            console.log(`deck is shuffled: ${data.deck_id}`);
            return $.getJSON(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=1`);
        })
        .then(res => {
            console.log(`The card you picked was the ${res.cards[0].value} of ${res.cards[0].suit}`);
            return $.getJSON(`https://deckofcardsapi.com/api/deck/${res.deck_id}/draw/?count=1`);
        })
        .then(res => {
            console.log(`The second card you picked was the ${res.cards[0].value} of ${res.cards[0].suit}`);
            
        })
        .catch(err => err)
    }

$("button").click(cardFromShuffledDeck);


        












