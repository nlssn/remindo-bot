'use strict';

const { Client, MessageEmbed } = require('discord.js');
const client = new Client();
const jsonfile = require('jsonfile');
const { DateTime } = require('luxon');
require('dotenv').config();

const color = 0x1aefb3;
let lectures, nextLecture;
let nextAlert = [];


client.on('ready', () => {
   console.log(`Logged in as ${client.user.tag}!`);

   jsonfile.readFile('./data.json', (err,obj) => {
      if (err) {
         console.error(err);
      } else {
         // Sort the lectures
         lectures = sortLectures(obj);
         nextLecture = lectures[0];
      }
   });
});

client.on('message', msg => {
   if (msg.content === '!all') {
      const allEmbed = new MessageEmbed()
         .setTitle('Alla kommande föreläsningar')
         .setColor(color);

         lectures.forEach(l => {
            allEmbed.addField(l.title, l.date, false);
         });

      msg.channel.send(allEmbed);
   } else if (msg.content === '!next') {
      const nextEmbed = new MessageEmbed()
         .setTitle('Nästa föreläsning')
         .setColor(color)
         .addField('Titel', nextLecture.title, false)
         .addField('Datum', nextLecture.date, false);

      msg.channel.send(nextEmbed);
   }
});

/* Sort the lectures according to date */
function sortLectures(arr) {
   return arr.sort((a,b) => DateTime.fromFormat(a.date, 'yyyy-MM-dd hh:mm') - DateTime.fromFormat(b.date, 'yyyy-MM-dd hh:mm'));
}

client.login(process.env.DISCORD_TOKEN);