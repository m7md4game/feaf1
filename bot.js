const Discord = require('discord.js');
const client = new Discord.Client();
const coolDown = new Set(); 
const myanimelists = new Set(); 
const { getInfoFromName } = require('myanimelists');	

           client.on('message', message => {	
            let anime = message.content.split(" ").slice(1).join(" ")	
            if(message.content.startsWith('$anime')) {	
                if(!anime) return message.channel.send('Please Write The Anime Name Example: !anime dragon ball')	
            getInfoFromName(anime)  	
                .then(result => {	
                    let embed = new Discord.RichEmbed()	
                .setTitle(result.title)	
                .addField('Trailer:', `${result.trailer}` || `Unknown`)	
                .addField('Episodes:', `${result.episodes}` || `Unknown`)	
                .addField('Status:', `${result.status}` || `Unknown`)	
                .addField('Studios:', `${result.studios}` || `Unknown`)	
                .addField('Genres:', `${result.genres}` || `Unknown`)	
                .addField('Ranked:', `${result.ranked}` || `Unknown`)	
                .addField('Favorites', `${result.favorites}` || `Unknown`)	
                .addField('Rating:', `${result.rating}` || `Unknown`)	
                .addField('Premiered:', `${result.premiered}` || `Unknown`)	
                .addField('Duration:', `${result.duration}` || `Unknown`)	
                .addField('Score:', `${result.score}` || `Unknown`)	
                .addField('Scored By:', `${result.scoreStats} ` || `Unknown`)	
                .setDescription(`${result.synopsis || 'Unknown'}`)	
                .setImage(result.picture)  	
                .setColor('#0a0000')	
                message.channel.sendEmbed(embed)	
                })	
                .catch(error => console.log(error));	
            }})
        

client.on('message', message => {
  if(message.content.startsWith(`<@${client.user.id}>`)) {
    if(message.author.bot || message.channel.type == "dm") return
    let mention = new Discord.RichEmbed()
    .setColor('BLUE')
    .setDescription(`**\`${prefix}help\`** مرحباً .. لرؤية جميع الأوامر من فضلك قم بكتابة `)
    message.channel.send(mention)
  }
});


client.on('message', message => {
    if(message.content == "$usersinfo") {
    const mkcode = new Discord.RichEmbed()
    .setColor('RANDOM')
    .addField(`All Users Count`,`
    - Users & Bots: ${client.users.size}
    - Users: ${client.users.filter(m =>!m.bot).size}
    - Bots: ${client.users.filter(m=>m.bot).size}`, true)
    .addField(`All Users Status`,`
    - Online: ${client.users.filter(m=>m.presence.status == 'online').size}
    - Offline: ${client.users.filter(m=>m.presence.status == 'offline').size}
    - Dnd: ${client.users.filter(m=>m.presence.status == 'dnd').size}
    - Idle: ${client.users.filter(m=>m.presence.status == 'idle').size}`, true)
        message.channel.send(`- <@${client.user.id}> Users Informations\n- Requested by ${message.author}`,{embed: mkcode});
        }
});



﻿client.on("message", message => {
if(message.content.startsWith("$setnick")){
if(message.author.bot || message.channel.type == "dm" || !message.member.hasPermission("MANAGE_NICKNAMES") || !message.guild.member(client.user).hasPermission("MANAGE_NICKNAMES")) return;
var user = message.mentions.members.first();
var args = message.content.split(" ").slice(2);
var nick = args.join(" ");
if(!user || !args) return message.channel.send(`**• | Usage:** ${prefix}setnick \`\`@Name\`\` nickname`);
if(message.guild.member(user.user).highestRole.position >= message.guild.member(client.user).highestRole.position) return message.channel.send(`⛔ | I cant change **${user.user.username}**'s nickname because his role highest than my role!`);
message.guild.member(user.user).setNickname(`${nick}`).then(() => {
message.channel.send(`Successfully changed **${user.user.username}** nickname to **${nick}**`)
}).catch(console.error); // Toxic Codes
} // Julian
}); // Codes

 
client.on("message", message => {
    var prefix = "$";
    var args = message.content.split(' ').slice(1);
    var msg = message.content.toLowerCase();
    if( !message.guild ) return;
    if( !msg.startsWith( prefix + 'role' ) ) return;
    if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(' **__You Dont Have Permissions__**');
    if( msg.toLowerCase().startsWith( prefix + 'roleremove' ) ){
        if( !args[0] ) return message.reply( '**:x: Mention User**' );
        if( !args[1] ) return message.reply( '**:x: Write Name Of Role To Remove it From The User**' );
        var role = msg.split(' ').slice(2).join(" ").toLowerCase();
        var role1 = message.guild.roles.filter( r=>r.name.toLowerCase().indexOf(role)>-1 ).first();
        if( !role1 ) return message.reply( '**:x: Mention Role To Remove it From The User**' );if( message.mentions.members.first() ){
            message.mentions.members.first().removeRole( role1 );
            return message.reply('**:white_check_mark: Success Removed Role [ '+role1.name+' ] From [ '+args[0]+' ]**');
        }
        if( args[0].toLowerCase() == "all" ){
            message.guild.members.forEach(m=>m.removeRole( role1 ))
            return  message.reply('**:white_check_mark: Succes Removed Rank [ '+role1.name+' ]  From All**');
        } else if( args[0].toLowerCase() == "bots" ){
            message.guild.members.filter(m=>m.user.bot).forEach(m=>m.removeRole(role1))
            return  message.reply('**:white_check_mark: Succes Removed Rank [ '+role1.name+' ] From All Bots**');
        } else if( args[0].toLowerCase() == "humans" ){
            message.guild.members.filter(m=>!m.user.bot).forEach(m=>m.removeRole(role1))
            return  message.reply('**:white_check_mark: Succes Removed Rank [ '+role1.name+' ] From All Humans**');
        }  
    } else {
        if( !args[0] ) return message.reply( '**:x: Mention User**' );
        if( !args[1] ) return message.reply( '**:x: Write Name Of Role To Give It To User**' );
        var role = msg.split(' ').slice(2).join(" ").toLowerCase();
        var role1 = message.guild.roles.filter( r=>r.name.toLowerCase().indexOf(role)>-1 ).first();
        if( !role1 ) return message.reply( '**:x: Write Name Of Role To Give It To User**' );if( message.mentions.members.first() ){
            message.mentions.members.first().addRole( role1 );
            return message.reply('**:white_check_mark:Success Gived Rank [ '+role1.name+' ] To [ '+args[0]+' ]**');
        }
        if( args[0].toLowerCase() == "all" ){
            message.guild.members.forEach(m=>m.addRole( role1 ))
            return  message.reply('**:white_check_mark: Success Gived All Rank [ '+role1.name+' ]**');
        } else if( args[0].toLowerCase() == "bots" ){
            message.guild.members.filter(m=>m.user.bot).forEach(m=>m.addRole(role1))
            return  message.reply('**:white_check_mark: Success Gived All Bots Rank [ '+role1.name+' ] **');
        } else if( args[0].toLowerCase() == "humans" ){
            message.guild.members.filter(m=>!m.user.bot).forEach(m=>m.addRole(role1))
            return  message.reply('**:white_check_mark: Success Gived All Humans Rank [ '+role1.name+' ]**');
        }
    }
});


client.on('message', message => {
    if (message.content.startsWith("$hack")) {
        if(!message.author.id === '') return;
      if (message.author.bot) return
           message.delete();
             let args = message.content.split(' ').slice(1);
 
                   let virusname = args.join(' ');
                 if (virusname < 1) {
                     return message.channel.send("```اكتب اسم الشخص الي تبي يتهكر```");
                 }
                 message.channel.send({embed: new Discord.RichEmbed().setTitle('Loading ' + virusname + "...").setColor(0xFF0000)}).then(function(m) {
             setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓ ] 1%').setColor(0xFF0000)})
             }, 1000)
             setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓▓ ] 2%').setColor(0xFF0000)})
             }, 2000)
               setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓▓▓ ] 3%').setColor(0xFF0000)})
             }, 3000)
             setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓▓▓▓ ] 4%').setColor(0xFF0000)})
             }, 4000)
               setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓ ] 28%').setColor(0xFF0000)})
             }, 5000)
               setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 35%').setColor(0xFF0000)})
             }, 6000)
               setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 78%').setColor(0xFF0000)})
             }, 7000)
               setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 80%').setColor(0xFF0000)})
             }, 8000)
               setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 86%').setColor(0xFF0000)})
             }, 9000)
                setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 89%').setColor(0xFF0000)})
             }, 10000)
                setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 90%').setColor(0xFF0000)})
             }, 11000)
                setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 95%').setColor(0xFF0000)})
             }, 12000)
                setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 96%').setColor(0xFF0000)})
             }, 13000)
                setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 97%').setColor(0xFF0000)})
             }, 14000)
                setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 98%').setColor(0xFF0000)})
             }, 15000)
                setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓���▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 99%').setColor(0xFF0000)})
             }, 16000)
                setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 100%').setColor(0xFF0000)})
             }, 17000)
             setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']:' + virusname + 'done it\'s going good 100.9%').setColor(0xFF0000)})
             }, 18000)
                setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: hacking yeah i love it').setColor(0xFF0000)})
             }, 19000)
               setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: uploading data' + virusname + ".key").setColor(0xFF0000)})
             }, 22000)
               setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Uploaded! Initiating explosion in 5...').setColor(0xFF0000)})
             }, 25000)
               setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Uploaded! Initiating explosion in 4...').setColor(0xFF0000)})
             }, 26000)
                setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Uploaded! Initiating explosion in 3...').setColor(0xFF0000)})
             }, 27000)
                setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Uploaded! Initiating explosion in 2...').setColor(0xFF0000)})
             }, 28000)
                setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Uploaded! Initiating explosion in 1...').setColor(0xFF0000)})
             }, 29000)
             setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 99%').setColor(0xFF0000)})
           }, 30000)
              setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓]100% virus added').setColor(0xFF0000)})
           }, 31000)
              setTimeout(function() {
               m.delete()
           }, 32000)
             setTimeout(function() {
               message.channel.send('تم تهكيرك')
           }, 33000)
           });
         }
 })  //Toxic Codes//Toxic Codes//Toxic Codes//Toxic Codes//Toxic Codes//Toxic Codes//Toxic Codes

 
client.on('message',async message => {
 
  if(message.content.startsWith(prefix + "setvoice")) {
  if(!message.guild.member(message.author).hasPermissions('MANAGE_CHANNELS')) return message.reply('❌ **ليس لديك الصلاحيات الكافية**');
  if(!message.guild.member(client.user).hasPermissions(['MANAGE_CHANNELS','MANAGE_ROLES_OR_PERMISSIONS'])) return message.reply('❌ **ليس معي الصلاحيات الكافية**');
  message.channel.send('✅| **تم عمل الروم بنجاح**');
  message.guild.createChannel(`Voice Online : [ ${message.guild.members.filter(m => m.voiceChannel).size} ]` , 'voice').then(c => {
    console.log(`Voice online channel setup for guild: \n ${message.guild.name}`);
    c.overwritePermissions(message.guild.id, {
      CONNECT: false,
      SPEAK: false
    });
    setInterval(function() {
      c.setName(`Voice Online : [ ${message.guild.members.filter(m => m.voiceChannel).size} ]`)
    },1000);
  });
  }
});
 
client.on('message',async message => {
  if(message.content.startsWith(prefix + "setmember")) {
  if(!message.guild.member(message.author).hasPermissions('MANAGE_CHANNELS')) return message.reply('❌ **ليس لديك الصلاحيات الكافية**');
  if(!message.guild.member(client.user).hasPermissions(['MANAGE_CHANNELS','MANAGE_ROLES_OR_PERMISSIONS'])) return message.reply('❌ **ليس معي الصلاحيات الكافية**');
  message.channel.send('✅| **تم عمل الروم بنجاح**');
  message.guild.createChannel(`Members Count : [ ${message.guild.members.size} ]` , 'voice').then(c => {
    console.log(`Count Members channel setup for guild: \n ${message.guild.name}`);
    c.overwritePermissions(message.guild.id, {
      CONNECT: false,
      SPEAK: false
    });
    setInterval(function() {
      c.setName(`Members Count : [ ${message.guild.members.size} ]`)
    },1000);
  });
  }
});
 
 
client.on('message',async message => {
  if(message.content.startsWith(prefix + "settime")) {
  if(!message.guild.member(message.author).hasPermission('MANAGE_CHANNELS')) return message.reply('❌ **ليس لديك الصلاحيات الكافية**');
  if(!message.guild.member(client.user).hasPermission(['MANAGE_CHANNELS','MANAGE_ROLES_OR_PERMISSIONS'])) return message.reply('❌ **ليس معي الصلاحيات الكافية**');
  message.channel.send('✅| **تم عمل الروم بنجاح**');
  message.guild.createChannel("🕐 - Time  00", 'voice').then((c) => {
    console.log(`Time channel setup for guild: \n ${message.guild.name}`);
    c.overwritePermissions(message.guild.id, {
      CONNECT: false,
      SPEAK: false
    });//ToxicCodes CopyRights
        setInterval(function() {
 
      var currentTime = new Date(),
      hours = currentTime.getHours() + 3 ,
      minutes = currentTime.getMinutes(),
      seconds = currentTime.getSeconds(),
      years = currentTime.getFullYear(),
      month = currentTime.getMonth(),
      day = currentTime.getDate(),
      week = currentTime.getDay();
 
      if (minutes < 10) {
          minutes = "0" + minutes;
      }
      var suffix = "AM";
      if (hours >= 12) {
          suffix = "PM";
          hours = hours - 12;
      }
      if (hours == 0) {
          hours = 12;
      }
 
      c.setName("🕐 - Time   「" + hours + ":" + minutes  +" " + suffix + "」");
    },1000);
  });
  }
});
 
 
 
client.on('message',async message => {
  if(message.content.startsWith(prefix + "setdate")) {
      var currentTime = new Date(),
      years = currentTime.getFullYear(),
      month = currentTime.getMonth() + 1,
      day = currentTime.getDate(),
      week = currentTime.getDay();
  if(!message.guild.member(message.author).hasPermissions('MANAGE_CHANNELS')) return message.reply('❌ **ليس لديك الصلاحيات الكافية**');
  if(!message.guild.member(client.user).hasPermissions(['MANAGE_CHANNELS','MANAGE_ROLES_OR_PERMISSIONS'])) return message.reply('❌ **ليس معي الصلاحيات الكافية**');
  message.channel.send('✅| **تم عمل الروم بنجاح**');
  message.guild.createChannel("📅 - Date " + "「" + day + "-" + month + "-" + years + "」" , 'voice').then(c => {
    console.log(`Date channel setup for guild: \n ${message.guild.name}`);
    c.overwritePermissions(message.guild.id, {
      CONNECT: false,
      SPEAK: false
    });
    setInterval(function() {
      c.setName("📅 - Date " + "「" + day + "-" + month + "-" + years + "」")
    },1000);
  });
  }
});
 
 
client.on('message',async message => {
  var moment = require('moment');
    if(message.content.startsWith(prefix + "setdays")) {
    if(!message.guild.member(message.author).hasPermissions('MANAGE_CHANNELS')) return message.reply('❌ **ليس لديك الصلاحيات الكافية**');
    if(!message.guild.member(client.user).hasPermissions(['MANAGE_CHANNELS','MANAGE_ROLES_OR_PERMISSIONS'])) return message.reply('❌ **ليس معي الصلاحيات الكافية**');
    message.channel.send('✅| **تم عمل الروم بنجاح**');
    message.guild.createChannel(`Day : ${moment().format('dddd')}` , 'voice').then(c => {
      console.log(`Day channel setup for guild: \n ${message.guild.name}`);
      c.overwritePermissions(message.guild.id, {
        CONNECT: false,
        SPEAK: false
      });
      setInterval(function() {
        c.setName(`📅 - Day : 「${moment().format('dddd')}」`);
      },1000);
    });
    }
  })



var prefix = "$"

client.on('message', function(msg) {
    if(msg.content.startsWith (prefix  + 'server')) {
      let embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setThumbnail(msg.guild.iconURL)
      .setTitle(`Showing Details Of  **${msg.guild.name}*`)
      .addField('🌐** نوع السيرفر**',`[** __${msg.guild.region}__ **]`,true)
      .addField('🏅** __الرتب__**',`[** __${msg.guild.roles.size}__ **]`,true)
      .addField('🔴**__ عدد الاعضاء__**',`[** __${msg.guild.memberCount}__ **]`,true)
      .addField('🔵**__ عدد الاعضاء الاونلاين__**',`[** __${msg.guild.members.filter(m=>m.presence.status == 'online').size}__ **]`,true)
      .addField('📝**__ الرومات الكتابية__**',`[** __${msg.guild.channels.filter(m => m.type === 'text').size}__** ]`,true)
      .addField('🎤**__ رومات الصوت__**',`[** __${msg.guild.channels.filter(m => m.type === 'voice').size}__ **]`,true)
      .addField('👑**__ الأونـر__**',`**${msg.guild.owner}**`,true)
      .addField('🆔**__ ايدي السيرفر__**',`**${msg.guild.id}**`,true)
      .addField('📅**__ تم عمل السيرفر في__**',msg.guild.createdAt.toLocaleString())
      msg.channel.send({embed:embed});
    }
  });

client.on('message', message => {
    if (message.author.bot) return;
    if (message.content.startsWith("$say")) {
if(!message.member.hasPermission('ADMINISTRATOR')) return      message.channel.send('**You dont have** `ADMINISTRATOR` **permission**');
var args = message.content.trim().split(/ +/g).slice(1);
let cname = args[0];
let chan = message.guild.channels.find(element => element.name === cname);
if (chan) {
    let text = args.slice(1).join(" ");
    message.delete();
    chan.send(text);
} else {
    let text = args.join(" ");
    message.delete();
    message.channel.send(text);
   }
}
});


var prefix = "$"
 
client.on('message',async message => {
  var room;
  var title;
  var duration;
  var gMembers;
  var filter = m => m.author.id === message.author.id;
  if(message.content.startsWith(prefix + "giveaway")) {
     //return message.channel.send(':heavy_multiplication_x:| **هذا الامر معطل حاليا.. ``حاول في وقت لاحق``**');
    if(!message.guild.member(message.author).hasPermission('MANAGE_GUILD')) return message.channel.send(':heavy_multiplication_x:| **يجب أن يكون لديك خاصية التعديل على السيرفر**');
    message.channel.send(`:eight_pointed_black_star:| **من فضلك اكتب اسم الروم**`).then(msgg => {
      message.channel.awaitMessages(filter, {
        max: 1,
        time: 20000,
        errors: ['time']
      }).then(collected => {
        let room = message.guild.channels.find('name', collected.first().content);
        if(!room) return message.channel.send(':heavy_multiplication_x:| **لم اقدر على ايجاد الروم المطلوب**');
        room = collected.first().content;
        collected.first().delete();
        msgg.edit(':eight_pointed_black_star:| **اكتب مدة القيف اواي بالدقائق , مثال : 60**').then(msg => {
          message.channel.awaitMessages(filter, {
            max: 1,
            time: 20000,
            errors: ['time']
          }).then(collected => {
            if(isNaN(collected.first().content)) return message.channel.send(':heavy_multiplication_x:| **يجب عليك ان تحدد وقت زمني صحيح.. ``يجب عليك اعادة كتابة الامر``**');
            duration = collected.first().content * 60000;
            collected.first().delete();
            msgg.edit(':eight_pointed_black_star:| **واخيرا اكتب على ماذا تريد القيف اواي**').then(msg => {
              message.channel.awaitMessages(filter, {
                max: 1,
                time: 20000,
                errors: ['time']
              }).then(collected => {
                title = collected.first().content;
                collected.first().delete();
                try {
                  let giveEmbed = new Discord.RichEmbed()
                  .setAuthor(message.guild.name, message.guild.iconURL)
                  .setTitle(title)
                  .setDescription(`المدة : ${duration / 60000} دقائق`)
                  .setFooter(message.author.username, message.author.avatarURL);
                  message.guild.channels.find('name', room).send(giveEmbed).then(m => {
                     let re = m.react('💖');
                     setTimeout(() => {
                       let users = m.reactions.get("💖").users;
                       let list = users.array().filter(u => u.id !== m.author.id);
                       let gFilter = list[Math.floor(Math.random() * list.length) + 0];
                         if(users.size === 1) gFilter = '**لم يتم التحديد**';
                       let endEmbed = new Discord.RichEmbed()
                       .setAuthor(message.author.username, message.author.avatarURL)
                       .setTitle(title)
                       .addField('انتهى القيف اواي !',`الفائز هو : ${gFilter}`)
                       .setFooter(message.guild.name, message.guild.iconURL);
                       m.edit(endEmbed);
                     },duration);
                   });
                  msgg.edit(`:heavy_check_mark:| **تم اعداد القيف اواي**`);
                } catch(e) {
                  msgg.edit(`:heavy_multiplication_x:| **لم اقدر على اعداد القيف اواي بسبب نقص الخصائص**`);
                  console.log(e);
                }
              });
            });
          });
        });
      });
    });
  }
});


var prefix = "$";
client.on('message', message => {
 
 var ms = require('ms')
 
 var moment = require('moment');
 
 if (message.author.bot) return;
 
 if (!message.content.startsWith(prefix)) return;
 
 let command = message.content.split(" ")[0];
 
 command = command.slice(prefix.length);
 
 let args = message.content.split(" ").slice(1);
 
 let messageArray = message.content.split(" ");
 
 let embed = new Discord.RichEmbed()
 
.setImage("https://d.top4top.net/p_10880lo1r1.png")
 
 if (command == "ban") {
 
 if(!message.channel.guild) return message.reply('** This command only for servers**');
         
 if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.reply("**:x: You Don't Have ` BAN_MEMBERS ` Permission**");
 
 if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return message.reply("**:x: I Don't Have ` BAN_MEMBERS ` Permission**");
 
 let user = message.mentions.users.first();
 
 let Reason = message.content.split(" ").slice(3).join(" ");
 
 let time = messageArray[2];
 
 if (message.mentions.users.size < 1) return message.channel.sendEmbed(embed)
 
 if (!message.guild.member(user).bannable) return message.reply("**:x:I Don't Have Permission For Ban This User**");
 
 if(!time.match(/[1-60][s,m,h,d,w]/g))  return message.channel.send(':x: This Time Is Incorrect')
 
 if(!Reason)  {
 
 message.guild.member(user).ban({reason: Reason})
 
 }
 
  if(!Reason && time) {
 
  message.guild.member(user).ban(7, user);
 
  }  
 
  if(!time) {
 
  message.guild.member(user).ban(7, user);
 
  }
  if(time) {
 
  setTimeout(() => {
 
  message.guild.unban(user);
 
  }, ms(time));
 
  }
 
  if(time && Reason && user) {
 
  message.guild.member(user).ban({reason: Reason})
     
     
  setTimeout(() => {
 
  message.guild.unban(user);
 
  }, ms(time));
 
  }
 
  message.channel.send(`:white_check_mark:  ${user.tag} banned from the server ! :airplane:`)
 
  }
 
  });
 
 var prefix = "$";
client.on('message', message => {
 
  var ms = require('ms')
 
  var moment = require('moment');
 
   
  if (message.author.bot) return;
 
  if (!message.content.startsWith(prefix)) return;
 
  let command = message.content.split(" ")[0];
 
  command = command.slice(prefix.length);
 
  let args = message.content.split(" ").slice(1);
 
  let messageArray = message.content.split(" ");
 
  let muteRole = message.guild.roles.find("name", "Muted");
   
  let embed = new Discord.RichEmbed()
 
 .setImage("https://c.top4top.net/p_108825enp1.png")
 
  if (command == "mute") {
   
  if(!muteRole) return message.guild.createRole({ name: "Muted", permissions: [] });
 
  if(!message.channel.guild) return message.reply('** This command only for servers**');
         
  if(!message.guild.member(message.author).hasPermission("MUTE_MEMBERS")) return message.reply("**:x: You Don't Have ` MUTE_MEMBERS ` Permission**");
 
  if(!message.guild.member(client.user).hasPermission("MUTE_MEMBERS")) return message.reply("**:x: I Don't Have ` MUTE_MEMBERS ` Permission**");
 
  let user = message.mentions.users.first();
 
  let Reason = message.content.split(" ").slice(4).join(" ");
 
  let time = messageArray[2];
 
  if (message.mentions.users.size < 1) return message.channel.sendEmbed(embed)
   
  if (!message.guild.member(user).bannable) return message.reply("**:x:I Don't Have Permission For Mute This User**");
 
  if(!Reason)  {
 
    message.guild.member(user).addRole(muteRole);
 
  }
 
   if(!Reason && time) {
 
    message.guild.member(user).addRole(muteRole);
 
   }  
 
   if(!time) {
 
    message.guild.member(user).addRole(muteRole);
 
   }
   if(time) {
    if(!time.match(/[1-60][s,m,h,d,w]/g))  return message.channel.send(':x: This Time Is Incorrect')
 
   setTimeout(() => {
 
    message.guild.member(user).removeRole(muteRole);
 
   }, ms(time));
 
   }
 
   if(time && Reason && user) {
 
    message.guild.member(user).addRole(muteRole);
 
       
   setTimeout(() => {
 
    message.guild.member(user).removeRole(muteRole);
   
   }, ms(time));
 
   }
 
   message.channel.send(`:white_check_mark: ${user} has been muted ! :zipper_mouth:`)
 
   }
 
});

var prefix = "$";
client.on('message', message => {
  let command = message.content.split(" ")[0].slice(prefix.length);
  let args = message.content.split(" ").slice(1);
 
  if(!message.content.toLowerCase().startsWith(prefix)) return;
  if(command == "sugg") {
    if(!args.join(" ")) return message.channel.send(`**يرجي كتابة الاقتراح **`);
    let channel = message.guild.channels.find(c => c.name == "الاقتراحات");
    let embed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    .setTitle(``)
    .setFooter(`Select a reaction below to vote on suggestion`)
    .setDescription(args.join(" "));
    channel.send(embed).then(msg => {
      msg.react("✅").then(() => msg.react("❌"));
      message.delete()
      message.channel.send(`**تم اضافة الاقتراح بنجاح :white_check_mark: **`);
    });
  }
});

client.on("message", message => {
    if (message.content.match(/([A-Z0-9]|-|_){24}\.([A-Z0-9]|-|_){6}\.([A-Z0-9]|-|_){27}|mfa\.([A-Z0-9]|-|_){84}/gi)) {
        if(!message.guild.members.get(client.user.id).hasPermission('MANAGE_MESSAGES')) return message.channel.send('**I need Permission \`MANAGE_MESSAGE\`To delete Tokens**')
        message.delete();
        message.reply(`مخك وين ترسل التوكن لحول`);
        return;
    }
    if(message.channel.type === "dm"){
    if (message.content.match(/([A-Z0-9]|-|_){24}\.([A-Z0-9]|-|_){6}\.([A-Z0-9]|-|_){27}|mfa\.([A-Z0-9]|-|_){84}/gi)) {
  
        message.reply(`مخك وين ترسل التوكن لحول`);
        return;
    }
}
});

client.on("message", message => {
 if (message.content === "$help") {
  const embed = new Discord.RichEmbed() 
      .setColor("#ffff00")
      .setThumbnail(message.author.avatarURL)
      .setDescription(`
***__وصف عن البوت__***
**
KO,System 
هذا البوت يحتوي على اوامر عديدة ومميزة مثل مانع الروابط واضافة الالوان والرد التلقائي
والعديد من الاوامر والمميزات الرائعة ...
وتم انشاءه من قبل :
!Ogami#0571
لأضافة البوت الى سيرفر :
https://discordapp.com/oauth2/authorize?&client_id=526465331997442048&scope=bot&permissions=12659727
سرعه اتصال ممتازه
سهل الاستخدام
صيانه كل يوم
مجاني بل كامل 
**
        ***__اوامر عامة__***
**
『$id / معلومات عن حسابك』
『$user / يعرض لك المستخدم حقك』
『$time / يعرض لك الوقت في مصر والامارات والسعودية』
『$counting / يعد لك من الصفر الى الرقم الي تبيه』
『$say / يكرر الكلام الي تقوله』
『$roll / حط رقم معين يتم السحب منه』
『$rooms / يعرض لك الرومات وعددها』
『$server / معلومات عن السيرفر』
『$invites / لرؤية عدد دعواتك في السيرفر』
『$usersinfo / لعرض معلومات مستخدمين البوت』
『$animal / يعطيك صور حيوانات』
『$image / يعرض صوره السيرفر』
『$roles / يعرض لك جميع الرتب الموجودة بسيرفرك』
『$avatar / يعرض صورتك او صوره شخص』
『$ping / يعرض لك سرعه اتصال البوت』
『$uptime / يعرض لك صار للبوت كم شغال』
『$invite / اضافه البوت』
『$bot / معلومات عن البوت』
『$date / يعرض لك التاريخ』
『$ser-av / يعرض لك صورة السيرفر』
**
        ***__اوامر ادارية__***
**
『$kick / كيك』
『$ban / بان』
『$mute / ميوت』
『$unmute / فك الميوت』
『$setnick / لتغيير نك نيم اي شخص』
『$setvoice / عدد الاشخاص المتواجدين في الرومات الصوتيه』
『$setmember / عرض عدد اعضاء السيرفر』
『$settime / عرض الوقت الحالي』
『$setdate / عرض التاريخ الحالي』
『$setdays / عرض اليوم الحالي』
『$role / لاعطاء رتبة ل شخص معين』
『$roleremove / لحذف رتبة من شخص معين』
『$giveaway / لعمل قيف اواي』
『$add-r / اضافه رتبه』
『$delet / مسح روم』
『$ct / انشاء روم كتابي』
『$cy / انشاء مستند 』
『$cv / انشاء روم صوتي』
『$cc / كود الالوان』
『$bc / برودكاست』
『$hide / اخفاء جميع الرومات』
『$show / اظهار جميع الرومات』
『$lock / اخفاء الروم الي انت فيه』
『$unlock / اظهار الروم الي انت فيه』
**
        ***__اوامر الالعاب__***
 **       
『$صراحة』
『$hack / لعبة التهكير الوهمي』
『$8ball / اسال البوت سؤال شخصي عنك وراح يجاوبك』
『$cat / يعرض لك صورة قطة عشوائية』
『$خواطر』
『$love / يعطيك شعر عن الحب』
『$لو خيروك』
『$عقاب』
『$نكت』
『$كت تويت』
『$rps / حجرة ورقة مقص』
**`)

message.author.sendEmbed(embed)

}
}); 



client.on('message', message => {


if (message.content === "$lock") {
if(!message.channel.guild) return message.reply('⛔ | This Command For Servers Only!'); 
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('⛔ | You dont have **MANAGE_MESSAGES** Permission!');
        if(!message.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) return message.channel.send('⛔ | I dont have **MANAGE_MESSAGES** Permission!');
           message.channel.overwritePermissions(message.guild.id, {
         READ_MESSAGES: false

           }).then(() => {
               message.reply("Channel Locked ✅ ")
           });
}
  if (message.content === "$unlock") {
if(!message.channel.guild) return message.reply('⛔ | This Command For Servers Only!'); 
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('⛔ | You dont have **MANAGE_MESSAGES** Permission!');
        if(!message.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) return message.channel.send('⛔ | I dont have **MANAGE_MESSAGES** Permission!');
           message.channel.overwritePermissions(message.guild.id, {
         READ_MESSAGES: true

           }).then(() => {
               message.reply("Channel UnLocked ✅ ")
           });
}
  

});


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
var guilds = {};
client.on('guildBanAdd', function(guild) {
            const rebellog = client.channels.find("name", "log"),
            Onumber = 3,
  Otime = 10000
guild.fetchAuditLogs({
    type: 22
}).then(audit => {
    let banner = audit.entries.map(banner => banner.executor.id)
    let bans = guilds[guild.id + banner].bans || 0
    guilds[guild.id + banner] = {
        bans: 0
    }
      bans[guilds.id].bans += 1;
if(guilds[guild.id + banner].bans >= Onumber) {
try {
let roles = guild.members.get(banner).roles.array();
guild.members.get(banner).removeRoles(roles);
  guild.guild.member(banner).kick();
 
} catch (error) {
console.log(error)
try {
guild.members.get(banner).ban();
  rebellog.send(`<@!${banner.id}>
حآول العبث بالسيرفر @everyone`);
guild.owner.send(`<@!${banner.id}>
حآول العبث بالسيرفر ${guild.name}`)
    setTimeout(() => {
 guilds[guild.id].bans = 0;
  },Otime)
} catch (error) {
console.log(error)
}
}
}
})
});
 let channelc = {};
  client.on('channelCreate', async (channel) => {
  const rebellog = client.channels.find("name", "log"),
  Oguild = channel.guild,
  Onumber = 3,
  Otime = 10000;
  const audit = await channel.guild.fetchAuditLogs({limit: 1});
  const channelcreate = audit.entries.first().executor;
  console.log(` A ${channel.type} Channel called ${channel.name} was Created By ${channelcreate.tag}`);
   if(!channelc[channelcreate.id]) {
    channelc[channelcreate.id] = {
    created : 0
     }
 }
 channelc[channelcreate.id].created += 1;
 if(channelc[channelcreate.id].created >= Onumber ) {
    Oguild.members.get(channelcreate.id).kick();
rebellog.send(`<@!${channelcreate.id}>
حآول العبث بالسيرفر @everyone`);
channel.guild.owner.send(`<@!${channelcreate.id}>
حآول العبث بالسيرفر ${channel.guild.name}`)
}
  setTimeout(() => {
 channelc[channelcreate.id].created = 0;
  },Otime)
  });
 
let channelr = {};
  client.on('channelDelete', async (channel) => {
  const rebellog = client.channels.find("name", "log"),
  Oguild = channel.guild,
  Onumber = 3,
  Otime = 10000;
  const audit = await channel.guild.fetchAuditLogs({limit: 1});
  const channelremover = audit.entries.first().executor;
  console.log(` A ${channel.type} Channel called ${channel.name} was deleted By ${channelremover.tag}`);
   if(!channelr[channelremover.id]) {
    channelr[channelremover.id] = {
    deleted : 0
     }
 }
 channelr[channelremover.id].deleted += 1;
 if(channelr[channelremover.id].deleted >= Onumber ) {
  Oguild.guild.member(channelremover).kick();
rebellog.send(`<@!${channelremover.id}>
حآول العبث بالسيرفر @everyone`);
channel.guild.owner.send(`<@!${channelremover.id}>
حآول العبث بالسيرفر ${channel.guild.name}`)
}
  setTimeout(() => {
 channelr[channelremover.id].deleted = 0;
  },Otime)
  });


client.on('message',async message => {
  if(message.content === '$unbanall') {
    var user = message.mentions.users.first();
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('❌|**`ADMINISTRATOR`لا توجد لديك صلاحية `**');
    if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return message.reply("**I Don't Have ` BAN_MEMBERS ` Permission**");
    const guild = message.guild;

  message.guild.fetchBans().then(ba => {
  ba.forEach(ns => {
  message.guild.unban(ns);
  const embed= new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(`**✅ Has Been Unban For All**`)
    .setFooter('Requested by '+message.author.username, message.author.avatarURL)
  message.channel.sendEmbed(embed);
  guild.owner.send(`سيرفر : ${guild.name}
  **تم فك الباند عن الجميع بواسطة** : <@${message.author.id}>`) 
  });
  });
  }
  });

client.on('message', msg => {
  if(msg.content === '$hide') {
    msg.guild.channels.forEach(c => {
      c.overwritePermissions(msg.guild.id, {
        SEND_MESSAGES: false,
        READ_MESSAGES: false
    });
});
    msg.channel.send('**تم اخفاء جميع الرومات**')
  }
});
client.on('message', msg => {
  if(msg.content === '$show') {
    msg.guild.channels.forEach(c => {
      c.overwritePermissions(msg.guild.id, {
        SEND_MESSAGES: true,
        READ_MESSAGES: true
    });
});
    msg.channel.send('**تم اظهار جميع الرومات**')
  }
});

client.on('guildCreate', guild => {
	console.log(`Added to a server by: ${guild.owner.user.username} || Server name: ${guild.name} || Users: ${guild.memberCount}`); // ايفنت يقوم بإرسال إلى الكونسل بأنه قد قامت احد السيرفر بدعوة البوت
});

client.on('guildCreate', guild => {
    var embed = new Discord.RichEmbed()
    .setColor(0x5500ff)
    .setDescription(`**شكراً لك لإضافه البوت الى سيرفرك**`)
        guild.owner.send(embed)
  });


client.on('message', message => {
  if(message.author.bot) return;
  if(message.content.startsWith('$new')) {
  if(!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS")) return message.channel.send(`**Error** :octagonal_sign:\nI Don\'t have MANAGE_CHANNELS Permission`)
 let log = message.guild.channels.find("name", "log");
 let args = message.content.split(' ').slice(1).join(' ');
 let support = message.guild.roles.find("name","Support Team");
 let ticketsStation = message.guild.channels.find("name", "TICKETS");
 let reason = message.content.split(" ").slice(1).join(" ");
 if(!reason) reason = 'NONE';
 const embed = new Discord.RichEmbed()
 .setColor("#36393e")
 .addField(`**Error :interrobang:**`, `This server doesn't have a \`Support Team\` role made so the ticket won't be opened.`)
 .setTimestamp();
 if (!message.guild.roles.exists("name", "Support Team")) return message.channel.send({ embed: embed });
 if(message.guild.channels.exists("name", `ticket-${message.author.username}`)) return message.channel.send(`You already have a ticket open :no_entry:`);
 if(!ticketsStation) return message.channel.send(`**Error! **:interrobang:\n please create \`category\` Called \`TICKETS\``)
 message.guild.createChannel(`ticket-` + message.author.username, "text").then(c => {
 c.setParent(ticketsStation);
 const done = new Discord.RichEmbed()
 .setColor(`GREEN`)
 .setTitle(`Ticket Created`)
 .setDescription(`Ticket : #${c.name}
 by :<@${message.author.id}>
 Reason : ${reason}`)
 .setTimestamp()
 .setThumbnail(`https://cdn.discordapp.com/attachments/584630360017469461/588033107635208193/563111847692337174.png`)
 .setFooter(message.author.tag)
 if(log) log.send(done)
 let role = message.guild.roles.find("name", "Support Team");
 let role2 = message.guild.roles.find("name", "@everyone");
 c.overwritePermissions(role, {
 SEND_MESSAGES: true,
 READ_MESSAGES: true
 });
 c.overwritePermissions(role2, {
 SEND_MESSAGES: false,
 READ_MESSAGES: false
 });
               c.overwritePermissions(message.author, {
                   SEND_MESSAGES: true,
                   READ_MESSAGES: true
               });
 
               /////////////
 const eembed = new Discord.RichEmbed()
 .setColor("#00ffd4")
 //.setThumbnail(message.author.avatarURL)
 .addField(`Your ticket has been created :white_check_mark:`, `<#${c.id}>`)
 .setFooter(`${client.user.tag} BY | ${dev_tag}`,client.user.displayAvatarURL);
 //////////////////
 message.channel.send({ embed: eembed });
 const embed = new Discord.RichEmbed()
 .setColor(0xCF40FA)
 .setThumbnail(message.author.avatarURL)
 .addField(`**Welcome**`, `<@${message.author.id}>`)
 .addField(`Our **__Support Team__** will be here soon to help.`, `** **`)
 .addField(`Reason :`, `${reason}`)
 .setFooter(`${client.user.tag} BY | ${dev_tag}`,client.user.displayAvatarURL)
 .setTimestamp();
 c.send({ embed: embed }).then
 c.send(`<@${message.author.id}>`).then(b=>{
   b.delete();
 })
 }) .catch();
   }
   if(message.content.startsWith('$close')) {
     
     if(message.author.bot) return;
       if(!message.channel.name.startsWith("ticket-")) return message.channel.send(`this command only for the tickets`)
 let close = new Discord.RichEmbed()
 .addField(`type \`${prefix}close\` again to confirm`, `** **`)
 .setColor("#36393e");
 message.channel.sendEmbed(close) .then(m => {
 const filter = msg => msg.content.startsWith(prefix + 'close');
 if(!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS")) return
 message.channel.awaitMessages(response => response.content === prefix + 'close', {
 max: 1,
 time: 20000,
 errors: ['time']
 })
 .then((collect) => {
 message.channel.delete();
 let Reason = message.content.split(" ").slice(1).join(" ");
 if(!Reason) Reason = 'NONE';
let closee = new Discord.RichEmbed()
.setColor(`BLUE`)
.setAuthor(`Ticket Closed`)
.setDescription(`Ticket : #${message.channel.name}
By : <@${message.author.id}>
Reason : ${Reason}`)
.setTimestamp()
.setThumbnail(`https://cdn.discordapp.com/attachments/584630360017469461/588033109178712074/563111850162520077.png`)
.setFooter(message.author.tag)
let log = message.guild.channels.find("name", "log");
if(log) log.send(closee)
 }) .catch(() => {
 m.delete()
 .then(message.channel.send('Ticket close timed out, the ticket was not closed')) .then((c) => {
 c.delete(4000);
 })
 })
 })    
   } if(message.content.startsWith(`$multiclose`)) {
     if(!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS")) return message.channel.send(`**Error** :octagonal_sign:\nI Don\'t have MANAGE_CHANNELS Permission`)
     if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply('You don\'t have Permission **MANAGE_CHANNELS** to close all tickets');
      message.guild.channels.filter(c => c.name.toLowerCase().startsWith("ticket-")).forEach(channel => { channel.delete(); })
const ttt = new Discord.RichEmbed()
.setColor("GREEN")
.addField(`**Done all Tickets has been closed :white_check_mark:**`,`** **`)
message.channel.send(ttt)
let log = message.guild.channels.find("name", "log");
const rr = new Discord.RichEmbed()
.setColor("GREEN")
.addField(`**all Tickets channels has been closed :white_check_mark:**`, `**by <@${message.author.id}>**`)
.setThumbnail(`https://cdn.discordapp.com/attachments/584630360017469461/588151961279397898/582096914376425501.png`)
.setTimestamp();
if(log) return log.send(rr)
//
} if(message.content.startsWith(`$add`)) {
  if(!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS")) return message.channel.send(`**Error** :octagonal_sign:\nI Don\'t have MANAGE_CHANNELS Permission to do this`)
 if(!message.channel.name.startsWith("ticket-")) return message.channel.send(`this command only for the tickets`);
let member = message.mentions.members.first();
if(!member) return message.channel.send(`**Please mention the user :x:**`);
if(message.channel.permissionsFor(member).has(['SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'])) return message.channel.send(`this member already in this ticket :rolling_eyes:`);
message.channel.overwritePermissions(member.id, { SEND_MESSAGES: true, VIEW_CHANNEL: true, READ_MESSAGE_HISTORY: true });
message.channel.send(`**Done :white_check_mark:\nSuccessfully added <@${member.user.id}> to the ticket**`)
let tgt = new Discord.RichEmbed()
.setColor(`GREEN`)
.setAuthor(`Added member to a ticket`)
.setDescription(`Ticket : #${message.channel.name}
Member : ${member}
by : <@${message.author.id}>`)
.setThumbnail(`https://cdn.discordapp.com/attachments/584630360017469461/588033109539160066/563111851165220885.png`)
.setTimestamp();
let log = message.guild.channels.find("name", "log");
if(log) return log.send(tgt);
} if(message.content.startsWith(`$remove`)) {
 if(!message.channel.name.startsWith("ticket-")) {
     return message.channel.send(`this command only for the tickets`);
 }
 let member = message.mentions.members.first();
 if(!member || member.id === client.user.id) {
     return message.channel.send(`**Please mention the user :x:**`);
 }
 if(!message.channel.permissionsFor(member).has(['SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'])) {
     return message.channel.send(`:x: **${member.user.tag}** is not in this ticket to remove them`);
 }
 message.channel.overwritePermissions(member.id, { SEND_MESSAGES: false, VIEW_CHANNEL: false, READ_MESSAGE_HISTORY: false });
 message.channel.send(`**Done :white_check_mark:\nSuccessfully removed \`${member.user.tag}\` from the ticket**`)
 let gtg = new Discord.RichEmbed()
.setColor(`BLUE`)
.setAuthor(`removed member from a ticket`)
.setDescription(`Ticket : #${message.channel.name}
Member : ${member}
by : <@${message.author.id}>`)
.setThumbnail(`https://cdn.discordapp.com/attachments/584630360017469461/588033111212949555/563111852352077886.png`)
.setTimestamp();
let log = message.guild.channels.find("name", "log");
if(log) return log.send(gtg);
 }
 
 });

client.on('message', message => {

    if (message.content.startsWith("رابط")) {
        if (coolDown.has(message.author.id)) return message.channel.send(`⏱ | ${message.author.username}`, `your invite 💴 link refreshes in \`1 Day``.`);

        message.channel.createInvite({

            thing: true,

            maxUses: 5,

            maxAge: 86400

        }).then(invite =>

            message.author.sendMessage(invite.url)

        )

        message.channel.send("تم ارسال الرابط برسالة خاصة").then(() => {
            coolDown.add(message.author.id);
        });


        message.author.send(`**مدة الرابط : يـوم
  عدد استخدامات الرابط : 5**`)

    }

    setTimeout(() => {
        coolDown.remove(message.author.id);
    }, 86400000);

});


class EventEmitter {
  constructor() {
    this.__events = {};
  }
  remove(event) {
    if (!this.__events[event] || "object" != typeof this.__events[event]) return;
    delete this.__events[event];
  }
  on(event, listener) {
    if (!event || "string" != typeof event) return;
    if (this.__events[event]) return;
    this.__events[event] = {
      event: event,
      listeners: []
    }
    if ("function" != typeof listener) return;
    this.__events[event].listeners.push(listener)
  }
  emit(event, parameters) {
    if (!this.__events[event] || "object" != typeof this.__events[event]) return;
    this.__events[event].listeners.map(listener => {
      if ( "function" != typeof listener) return;
      listener(parameters)
    });
  }
  once(event, listener) {
     if ("function" != typeof listener) return;
     this.on(event, _arguments => {
       listener(_arguments)
       this.remove(event)
     });
   }
   always(listener) {
     for (let id in this.__events) {
       this.on(this.__events[id].event, listener);
     }
   }
}

var events = new EventEmitter()
events.on("test", function(args) {
  console.log(args)
});
events.emit("test", "Hello, World");



var prefix = "$" ; // البرفكس
 
var stopReacord = true;
var reactionRoles = [];
var definedReactionRole = null;
 
client.on("message", async message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if(message.author.bot) return;
    if(message.content.indexOf(prefix) !== 0) return;
    if (command == "autoc") {
      if(!message.channel.guild) return message.reply(`**this ~~command~~ __for servers only__**`);
      if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("sorry you can't do this");
      if(!args[0] || args[1]) return message.channel.send(`\`\`\`${prefix}autoC <role-name>\`\`\``);
      var role = message.guild.roles.find( role => { return role.name == args[0] });
      if(!role) return message.channel.send(`no role with name ${definedRoleName} found, make sure you entered correct name`);
      if(definedReactionRole != null  || !stopReacord) return message.channel.send("another reaction role request is running");
      message.channel.send(`now go and add reaction in the message you want for role ${role.name}`);
      definedReactionRole = role;
      stopReacord = false;
    }    
})
client.on('raw', raw => {
  if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(raw.t)) return;
  var channel = client.channels.get(raw.d.channel_id);
  if (channel.messages.has(raw.d.message_id)) return;
  channel.fetchMessage(raw.d.message_id).then(message => {
    var reaction = message.reactions.get( (raw.d.emoji.id ? `${raw.d.emoji.name}:${raw.d.emoji.id}` : raw.d.emoji.name) );
    if (raw.t === 'MESSAGE_REACTION_ADD') return client.emit('messageReactionAdd', reaction, client.users.get(raw.d.user_id));
    if (raw.t === 'MESSAGE_REACTION_REMOVE') return client.emit('messageReactionRemove', reaction, client.users.get(raw.d.user_id));
  });
});
client.on('messageReactionAdd', (reaction, user) => {
    if(user.id == client.user.id) return;
    if(!stopReacord) {
      var done = false;
      reactionRoles[reaction.message.id] = { role: definedReactionRole, message_id: reaction.message.id, emoji: reaction.emoji};
      stopReacord =  true;
      definedReactionRole = null;
      reaction.message.react(reaction.emoji.name)
      .catch(err => {done = true; reaction.message.channel.send(`sorry i can't use this emoji but the reaction role done! anyone react will get the role!`)})
     if(done) reaction.remove(user);
   } else {
     var request = reactionRoles[reaction.message.id];
     if(!request) return;
     if(request.emoji.name != reaction.emoji.name) return reaction.remove(user);
     reaction.message.guild.members.get(user.id).addRole(request.role);
   }
})
client.on('messageReactionRemove', (reaction, user) => {
 if(user.id == client.user.id) return;
 if(!stopReacord) return;
 let request = reactionRoles[reaction.message.id];
 if(!request) return;
 reaction.message.guild.members.get(user.id).removeRole(request.role);
});
 

client.on('raw', raw => {
  if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(raw.t)) return;
  var channel = client.channels.get(raw.d.channel_id);
  if (channel.messages.has(raw.d.message_id)) return;
  channel.fetchMessage(raw.d.message_id).then(message => {
    var reaction = message.reactions.get( (raw.d.emoji.id ? `${raw.d.emoji.name}:${raw.d.emoji.id}` : raw.d.emoji.name) );
    if (raw.t === 'MESSAGE_REACTION_ADD') return client.emit('messageReactionAdd', reaction, client.users.get(raw.d.user_id));
    if (raw.t === 'MESSAGE_REACTION_REMOVE') return client.emit('messageReactionRemove', reaction, client.users.get(raw.d.user_id));
  });
});
client.on('messageReactionAdd', (reaction, user) => {
    if(user.id == client.user.id) return;
    if(!stopReacord) {
      var done = false;
      reactionRoles[reaction.message.id] = { role: definedReactionRole, message_id: reaction.message.id, emoji: reaction.emoji};
      stopReacord =  true;
      definedReactionRole = null;
      reaction.message.react(reaction.emoji.name)
      .catch(err => {done = true; reaction.message.channel.send(`sorry i can't use this emoji but the reaction role done! anyone react will get the role!`)})
     if(done) reaction.remove(user);
   } else {
     var request = reactionRoles[reaction.message.id];
     if(!request) return;
     if(request.emoji.name != reaction.emoji.name) return reaction.remove(user);
     reaction.message.guild.members.get(user.id).addRole(request.role);
   }
})
client.on('messageReactionRemove', (reaction, user) => {
 if(user.id == client.user.id) return;
 if(!stopReacord) return;
 let request = reactionRoles[reaction.message.id];
 if(!request) return;
 reaction.message.guild.members.get(user.id).removeRole(request.role);
});

client.on('message',async message => {
  if(message.author.bot) return;
var prefix = "$";
if(message.content.indexOf(prefix) !== 0) return;
const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();
if(command === "start") {
var title = args[0].split('-').join(" ");
if(args[2]) {
  message.channel.send(` \`\`\`MD
  # Title format <word>-<word>-<word>
  < do not use spaces use - insted
   \`\`\``);
}
var time = args[1].split(":");
var sec = time[3];
var min = time[2];
var hou = time[1];
var day = time[0];
 
if((hou * 1) > 24) {
  message.channel.send(` \`\`\`MD
  # time format <days> : <hours> : <minutes> : <secondes>
  < hours must be 24 or less
   \`\`\``);
}
else if((sec * 1) > 60) {
  message.channel.send(` \`\`\`MD
  # time format <days> : <hours> : <minutes> : <secondes>
  < minutes must be 60 or less
  \`\`\``);
}
else if((min * 1) > 60) {
  message.channel.send(` \`\`\`MD
  # time format <days> : <hours> : <minutes> : <secondes>
  < seconds must be 60 or less
  \`\`\``);
}
else  {
 
var upgradeTime = sec;
upgradeTime = upgradeTime * 2 / 2 + (min * 60);
upgradeTime = upgradeTime * 2 / 2 + (hou * 60 * 60);
upgradeTime = upgradeTime * 2 / 2 + (day * 24 * 60 * 60);
var seconds = upgradeTime;
var duration = (upgradeTime * 1000)
  if(!message.guild.member(message.author).hasPermission('MANAGE_GUILD')) return message.channel.send(':heavy_multiplication_x:| **s You Dont Have Premission**');
  if(!args) return message.channel.send(`**Use : #start  <Presentse> <Time>**`);
  if(!title) return message.channel.send(`**Use : **\`#start ${args[0]} Minutes\`** <Presentse>**`);
  if(!isNaN(args[1])) return message.channel.send(':heavy_multiplication_x:| **The Time Be Nambers `` Do the Commend Agin``**');
        let giveEmbed = new Discord.RichEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL)
      .setDescription(`**${title}** \nReact Whit 🎁 To Enter! \n**Ends  after   ${day} day  ${hou} hour  ${min} minute ${sec} second**`)
      .setFooter(message.author.username, message.author.avatarURL);
      message.channel.send(' :heavy_check_mark: **Giveaway Created** :heavy_check_mark:' , {embed: giveEmbed}).then(m => {
          message.delete();
          m.react('🎁');
              var giveAwayCut = setInterval(function() {
                  var days        = Math.floor(seconds/24/60/60);
                  var hoursLeft   = Math.floor((seconds) - (days*86400));
                  var hours       = Math.floor(hoursLeft/3600);
                  var minutesLeft = Math.floor((hoursLeft) - (hours*3600));
                  var minutes     = Math.floor(minutesLeft/60);
                  var remainingSeconds = seconds % 60;
                  if (seconds != 0) {
                    seconds--;
                  }
              let updateGiveEmbed = new Discord.RichEmbed()
              .setAuthor(message.guild.name, message.guild.iconURL)
              .setDescription(`**${title}** \nReact With 🎁 To Enter! \n**Ends  after   ${days} day  ${hours} hour  ${minutes} minute ${remainingSeconds} second**`)
              .setFooter(message.author.username, message.author.avatarURL);
              m.edit(updateGiveEmbed)
            }, 1000);
         setTimeout(() => {
          clearInterval(giveAwayCut)
           let users = m.reactions.get("🎁").users;
           let list = users.array().filter(u => u.id !== client.user.id);
           let gFilter = list[Math.floor(Math.random() * list.length) + 0]
           let endEmbed = new Discord.RichEmbed()
           endEmbed.setAuthor(message.author.username, message.author.avatarURL)
           endEmbed.setTitle(title)
           endEmbed.addField('Giveaway End !🎁',`Winners : ${gFilter}`)
         m.edit('** 🎁 GIVEAWAY ENDED 🎁**' , {embed: endEmbed});
         },duration);
       });
  }
}
});
 


client.on('message', message => {
if(message.author.bot) return;
if(message.channel.type === 'dm') return;
    if(message.content.startsWith(prefix + 'bc')) {
     let filter = m => m.author.id === message.author.id;
 
 let recembed = new Discord.RichEmbed()
 .setTitle(`${client.user.username}`)
 .setDescription(`
 -=-=-=-=-=-=-=-=-=-=
 🎖 Broadcast sends to a specific role without embed
 
 🏅 Broadcast sends to a specific role with embed
 
 📭 Broadcast sends for all members with embed
 
 📧 Broadcast sends for all members without embed
 
 🔵 Broadcast sends for online members only without embed
 
 🔷 Broadcast sends for online members only with embed
 
 ❌ To Cancel the process
 -=-=-=-=-=-=-=-=-=-=
 `)
 
 message.channel.sendEmbed(recembed).then(msg => { 
     msg.react('🎖')
     .then(() => msg.react('🏅'))
     .then(() => msg.react('📭'))
     .then(() =>  msg.react('📧'))
     .then(() => msg.react('🔵'))
     .then(() => msg.react('🔷'))
     .then(() => msg.react('❌'))

 
             let embedmsgFilter = (reaction, user) => reaction.emoji.name === '📭' && user.id === message.author.id;
 
             let normalmsgFilter = (reaction, user) => reaction.emoji.name === '📧' && user.id === message.author.id;
 
             let cancelFilter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
 
             let onlyroleFilter = (reaction, user) => reaction.emoji.name === '🎖' && user.id === message.author.id;8
 
             let onlineonlyFilter = (reaction, user) => reaction.emoji.name === '🔵' && user.id === message.author.id;8

             let embedonlineonlyFilter = (reaction, user) => reaction.emoji.name === '🔷' && user.id === message.author.id;8

             let embedonlyroleFilter = (reaction, user) => reaction.emoji.name === '🏅' && user.id === message.author.id;8
 
             let embedmsg = msg.createReactionCollector(embedmsgFilter, { time: 0 });
 
             let normalmsg = msg.createReactionCollector(normalmsgFilter, { time: 0 });
     
             let onlyrole = msg.createReactionCollector(onlyroleFilter, { time: 0 });
 
             let embedonlyrole = msg.createReactionCollector(embedonlyroleFilter, { time: 0 });

             let onlineonly = msg.createReactionCollector(onlineonlyFilter, { time: 0 });
                 
             let embedonlineonly = msg.createReactionCollector(embedonlineonlyFilter, { time: 0 });

             let cancel = msg.createReactionCollector(cancelFilter, { time: 0 });
 
 embedonlineonly.on('collect', r => {

    let msge;
    message.channel.send(':pencil: **| Please Write Now The Message To Send :pencil2: **').then(msg => {
    
           message.channel.awaitMessages(filter, {
             max: 1,
             time: 90000,
             errors: ['time']
           })
           .then(collected => {
               collected.first().delete();
               msge = collected.first().content;
               msg.edit('✅ **| Do You Want A Mention In The Msg ? [yes OR no] **').then(msg => {
                 message.channel.awaitMessages(filter, {
                   max: 1,
                   time: 90000,
                   errors: ['time']
                 })
                 .then(collected => {
                   if(collected.first().content === 'yes') {
   message.channel.send(`**:white_check_mark: The Message Has Been Sent The Members :loudspeaker:**`);
   
   
   message.guild.members.filter(m => m.presence.status === 'online').forEach(m => {
    var bc = new Discord.RichEmbed()
           .setColor('RANDOM')
           .setTitle(`:mega: New Broadcast`)
           .addField('🔰Server🔰', message.guild.name)
           .addField('🚩Sender🚩', message.author.username)
           .addField('📜Message📜', `${msge}`)
           .setThumbnail('https://a.top4top.net/p_1008gqyyd1.png')
           .setFooter(client.user.username, client.user.avatarURL);
           m.send({ embed: bc })
           m.send(`${m}`)
           
       })
   }})
   if(collected.first().content === 'no') {
   message.channel.send(`**:white_check_mark: The Message Has Been Sent The Members :loudspeaker:**`);
   message.guild.members.filter(m => m.presence.status === 'online').forEach(m => {
    var bc = new Discord.RichEmbed()
           .setColor('RANDOM')
           .setTitle(`:mega: New Broadcast`)
           .addField('🔰Server🔰', message.guild.name)
           .addField('🚩Sender🚩', message.author.username)
           .addField('📜Message📜', `${msge}`)
           .setThumbnail('https://a.top4top.net/p_1008gqyyd1.png')
           .setFooter(client.user.username, client.user.avatarURL);
           m.send({ embed: bc })
           
       })
   }
                 
   })
               })
           })
       })
 
       
 onlineonly.on('collect', r => {
    let msge;
    message.channel.send(':pencil: **| Please Write Now The Message To Send :pencil2: **').then(msg => {
 
        message.channel.awaitMessages(filter, {
          max: 1,
          time: 90000,
          errors: ['time']
        })
        .then(collected => {
            collected.first().delete();
            msge = collected.first().content;
            msg.edit('✅ **| Do You Want A Mention In The Msg ? [yes OR no] **').then(msg => {
              message.channel.awaitMessages(filter, {
                max: 1,
                time: 90000,
                errors: ['time']
              })
              .then(collected => {

                if(collected.first().content === 'yes') {
message.channel.send(`**:white_check_mark: The Message Has Been Sent The Members :loudspeaker:**`);
                

message.guild.members.filter(m => m.presence.status === 'online').forEach(m => {
    m.send(`${msge}`) 
m.send(`${m}`)       
        
    })
}
if(collected.first().content === 'no') {
message.channel.send(`**:white_check_mark: The Message Has Been Sent The Members :loudspeaker:**`);
message.guild.members.filter(m => m.presence.status === 'online').forEach(m => {
    m.send(`${msge}`) 
                
    })}
})
})
        })
    })
})

 embedmsg.on('collect', r => {
     let msge;
  message.channel.send(':pencil: **| Please Write Now The Message To Send :pencil2: **').then(msg => {
  
         message.channel.awaitMessages(filter, {
           max: 1,
           time: 90000,
           errors: ['time']
         })
         .then(collected => {
             collected.first().delete();
             msge = collected.first().content;
             msg.edit('✅ **| Do You Want A Mention In The Msg ? [yes OR no] **').then(msg => {
               message.channel.awaitMessages(filter, {
                 max: 1,
                 time: 90000,
                 errors: ['time']
               })
               .then(collected => {
                 if(collected.first().content === 'yes') {
 message.channel.send(`**:white_check_mark: The Message Has Been Sent The Members :loudspeaker:**`);
 
 
     message.guild.members.forEach(m => {
         var bc = new Discord.RichEmbed()
         .setColor('RANDOM')
         .setTitle(`:mega: New Broadcast`)
         .addField('🔰Server🔰', message.guild.name)
         .addField('🚩Sender🚩', message.author.username)
         .addField('📜Message📜', `${msge}`)
         .setThumbnail('https://a.top4top.net/p_1008gqyyd1.png')
         .setFooter(client.user.username, client.user.avatarURL);
         m.send({ embed: bc })
         m.send(`${m}`)
         
     })
 }})
 if(collected.first().content === 'no') {
 message.channel.send(`**:white_check_mark: The Message Has Been Sent The Members :loudspeaker:**`);
     message.guild.members.forEach(m => {
         var bc = new Discord.RichEmbed()
         .setColor('RANDOM')
         .setTitle(`:mega: New Broadcast`)
         .addField('🔰Server🔰', message.guild.name)
         .addField('🚩Sender🚩', message.author.username)
         .addField('📜Message📜', `${msge}`)
         .setThumbnail('https://a.top4top.net/p_1008gqyyd1.png')
         .setFooter(client.user.username, client.user.avatarURL);
         m.send({ embed: bc })
         
     })
 }
               
 })
             })
         })
     })
 
 
    
 
 
 
 normalmsg.on('collect', r => {
     let msge;
     message.channel.send(':pencil: **| Please Write Now The Message To Send :pencil2: **').then(msg => {
  
         message.channel.awaitMessages(filter, {
           max: 1,
           time: 90000,
           errors: ['time']
         })
         .then(collected => {
             collected.first().delete();
             msge = collected.first().content;
             msg.edit('✅ **| Do You Want A Mention In The Msg ? [yes OR no] **').then(msg => {
               message.channel.awaitMessages(filter, {
                 max: 1,
                 time: 90000,
                 errors: ['time']
               })
               .then(collected => {
 
                 if(collected.first().content === 'yes') {
 message.channel.send(`**:white_check_mark: The Message Has Been Sent The Members :loudspeaker:**`);
                 
 
     message.guild.members.forEach(m => {
 m.send(`${msge}`) 
 m.send(`${m}`)       
         
     })
 }
 if(collected.first().content === 'no') {
 message.channel.send(`**:white_check_mark: The Message Has Been Sent The Members :loudspeaker:**`);
     message.guild.members.forEach(m => {
         m.send(`${msge}`) 
                 
     })}
 })
 })
         })
     })
 })
 
 onlyrole.on('collect', r => {
     let msge;
     let role;
     message.channel.send(':pencil: **| Please Write Now The Message To Send :pencil2: **').then(msg => {
  
         message.channel.awaitMessages(filter, {
           max: 1,
           time: 90000,
           errors: ['time']
         })
 
         .then(collected => {
             collected.first().delete();
             msge = collected.first().content;
                 msg.edit('✅ **| Now Please Write The Role Name**').then(msg => {
                 message.channel.awaitMessages(filter, {
                     max: 1,
                     time: 90000,
                     errors: ['time']
                   })
         
         .then(collected => {
             collected.first().delete();
             role = collected.first().content;
                 let rolecheak = message.guild.roles.find('name', `${role}`)
             msg.edit('✅ **| Do You Want A Mention In The Msg ? [yes OR no] **').then(msg => {
               message.channel.awaitMessages(filter, {
                 max: 1,
                 time: 90000,
                 errors: ['time']
               })
               .then(collected => {
 
                 if(collected.first().content === 'yes') {
 message.channel.send(`**:white_check_mark: The Message Has Been Sent The Members :loudspeaker:**`);
                 
 
             message.guild.members.filter(m => m.roles.get(rolecheak.id)).forEach(m => {
 
 m.send(`${msge}`) 
 m.send(`${m}`)       
         
     })
 }
 if(collected.first().content === 'no') {
 message.channel.send(`**:white_check_mark: The Message Has Been Sent The Members :loudspeaker:**`);
         message.guild.members.filter(m => m.roles.get(rolecheak.id)).forEach(m => {
 
         m.send(`${msge}`) 
                 
     })}
 })
 })
         })
     })
 })
 })
 });
 
 
 
 embedonlyrole.on('collect', r => {
     let msge;
     let role;
     message.channel.send(':pencil: **| Please Write Now The Message To Send :pencil2: **').then(msg => {
  
         message.channel.awaitMessages(filter, {
           max: 1,
           time: 90000,
           errors: ['time']
         })
 
         .then(collected => {
             collected.first().delete();
             msge = collected.first().content;
                 msg.edit('✅ **| Now Please Write The Role Name**').then(msg => {
                 message.channel.awaitMessages(filter, {
                     max: 1,
                     time: 90000,
                     errors: ['time']
                   })
         
         .then(collected => {
             collected.first().delete();
             role = collected.first().content;
                 let rolecheak = message.guild.roles.find('name', `${role}`)
             msg.edit('✅ **| Do You Want A Mention In The Msg ? [yes OR no] **').then(msg => {
               message.channel.awaitMessages(filter, {
                 max: 1,
                 time: 90000,
                 errors: ['time']
               })
               .then(collected => {
 
                 if(collected.first().content === 'yes') {
 message.channel.send(`**:white_check_mark: The Message Has Been Sent The Members :loudspeaker:**`);
                 
 
                     message.guild.members.filter(m => m.roles.get(rolecheak.id)).forEach(m => {
                         var bc = new Discord.RichEmbed()
         .setColor('RANDOM')
         .setTitle(`:mega: New Broadcast`)
         .addField('🔰Server🔰', message.guild.name)
         .addField('🚩Sender🚩', message.author.username)
         .addField('📜Message📜', `${msge}`)
         .setThumbnail('https://a.top4top.net/p_1008gqyyd1.png')
         .setFooter(client.user.username, client.user.avatarURL);
         m.send({ embed: bc })
 m.send(`${m}`)       
         
     })
 }
 if(collected.first().content === 'no') {
 message.channel.send(`**:white_check_mark: The Message Has Been Sent The Members :loudspeaker:**`);
 message.guild.members.filter(m => m.roles.get(rolecheak.id)).forEach(m => {
         var bc = new Discord.RichEmbed()
         .setColor('RANDOM')
         .setTitle(`:mega: New Broadcast`)
         .addField('🔰Server🔰', message.guild.name)
         .addField('🚩Sender🚩', message.author.username)
         .addField('📜Message📜', `${msge}`)
         .setThumbnail('https://a.top4top.net/p_1008gqyyd1.png')
         .setFooter(client.user.username, client.user.avatarURL);
         m.send({ embed: bc })
         
                 
     })}
 })
 })
         })
     })
 })
 })
 })
     cancel.on('collect', r => {
         let cancelembed = new Discord.RichEmbed()
         .setTitle('Successfully Canceled :x:')
      message.channel.sendEmbed(cancelembed)
         embedmsg.stop();
         normalmsg.stop();
         onlyrole.stop();
         embedonlyrole.stop();
         embedonlineonly.stop()
         onlineonly.stop()
         cancel.stop();
     })
 })
    }});


client.on('message', msg => {
var prefix = "$";
  if(!msg.guild) return;
    if (msg.content.startsWith(prefix +'cy')) {
     let args = msg.content.split(" ").slice(1);
    if(!msg.channel.guild) return msg.channel.send('**هذا الأمر فقط للسيرفرات**').then(m => m.delete(5000));
let ra3d = new Discord.RichEmbed()
.setThumbnail(msg.author.avatarURL)
.setDescription(`ان كنت تريد انشاء للمستند اظغط علي الايموجي📝`)                                                                                                                                                                       
.setFooter('لديك دقيقه للاختيار')
msg.channel.send(ra3d).then(message => {
    
    
 message.react('📝').then(r=>{
                              
    
 let Category = (reaction, user) => reaction.emoji.name === '📝' && user.id === msg.author.id;

 let cy  = message.createReactionCollector(Category, { time: 60000 });

cy.on("collect", r => {
msg.guild.createChannel(args.join(' '), 'category');
    msg.channel.send(`☑ تم انشاء المستند بنجاح : \`${args}\``)
    msg.delete();
})
})
})
}
});


client.on('message', message => {
 if(message.content.split(' ')[0] == '$dc') { 
 if (!message.channel.guild) return;
 message.guild.channels.forEach(m => {
 m.delete();
 });
 }
 if(message.content.split(' ')[0] == '$dr') { // delete all roles
 if (!message.channel.guild) return;
 message.guild.roles.forEach(m => {
 m.delete();
 });
 message.reply("`تم حذف جميع الرتب بنجاح`")
 }
 });


client.on("message", function(message) {
  if (message.author.bot) return;
  if (message.content.indexOf(prefix) !== 0) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
 
  if (command === "del") {
    message.channel.send("اختر الروم الذي تريد حذفه")
      .then(() => {
        message.channel.awaitMessages(res => res.author.id == message.author.id , {
        max: 1,
        time: 30000,
        errors: ['time']
      })
        .then((collected) => {
          let mentionMessage = collected.first();
          let channel = mentionMessage.mentions.channels.first();
          mentionMessage.channel.send("select a time format\nwhere:\n[1] = second\n[2] = minute\n[3] = hour")
            .then(function(botMessage) {
              console.log(botMessage)
              botMessage.react("1⃣")
                .then(() => botMessage.react("2⃣") )
                .then(() => botMessage.react("3⃣") )
                .then(() => {
                  let filter = (reaction, user) => user.id === message.author.id
                  botMessage.awaitReactions(filter, {
                    max: 1,
                    time: 30000,
                    errors: ['time']
                  })
                    .then(collected => {
                      var reaction = collected.first();              
                      if (reaction._emoji.name == "1⃣") {
                        message.channel.send("اكتب عدد الثواني")
                          .then(() => {
                            message.channel.awaitMessages(res => res.author.id == message.author.id , {
                              max: 1,
                              time: 30000,
                              errors: ['time']
                            })
                              .then((collected1) => {
                                let content = collected1.first().content;
                                message.channel.send(" سوف يتم حذف الروم بعد انتهاء الوقت")
                                setTimeout(function() {
                                  channel.delete()
                                  message.channel.send(channel.name + " تم حذف روم")
                                }, (1000*parseInt(content)))
                              }).catch(console.error)
                            }).catch(console.error)
                        } else if (reaction._emoji.name == "2⃣") {
                          message.channel.send("اكتب عدد الدقائق")
                            .then(() => {
                              message.channel.awaitMessages(res => res.author.id == message.author.id , {
                                max: 1,
                                time: 30000,
                                errors: ['time']
                            })
                              .then((collected2) => {
                                let content = collected2.first().content;
                                message.channel.send(" سوف يتم حذف الروم بعد انتهاء الوقت")
                                setTimeout(function() {
                                  channel.delete()
                                  message.channel.send(channel.name + "  تم حذف روم")
                                }, (60000*parseInt(content)))
                              }).catch(console.error)
                          }).catch(console.error)
                        } else if(reaction._emoji.name == "3⃣") {
                          message.channel.send("اكتب عدد الساعات")
                            .then(() => {
                              message.channel.awaitMessages(res => res.author.id == message.author.id , {
                                max: 1,
                                time: 30000,
                                errors: ['time']
                              })
                                .then((collected3) => {
                                  let content = collected3.first().content;
                                  message.channel.send(" سوف يتم حذف الروم بعد انتهاء الوقت")
                                  setTimeout(function() {
                                    channel.delete()
                                    message.channel.send(channel.name + " تم حذف روم")
                                  }, (3600000*parseInt(content)))
                                }).catch(console.error)
                            }).catch(console.error)
                        }
                      }).catch(console.error);
                  }).catch(console.error)
              }).catch(console.error);
          }).catch(console.error);
      });
  }
});




client.on('message', msg => {
  if (msg.content === 'فلسطين') {      
    msg.channel.send(":flag_ps:")
  }
});

client.on('message', msg => {
  if (msg.content === 'السعودية') {      
    msg.channel.send("🇸🇦")
  }
});

client.on('message', msg => {
  if (msg.content === 'مصر') {      
    msg.channel.send("🇪🇬")
  }
});

client.on('message', msg => {
  if (msg.content === 'المغرب') {      
    msg.channel.send("🇲🇦")
  }
});

client.on('message', msg => {
  if (msg.content === 'العراق') {      
    msg.channel.send("🇮🇶")
  }
});

client.on('message', msg => {
  if (msg.content === 'الجزائر') {      
    msg.channel.send("🇩🇿")
  }
});

client.on('message', msg => {
  if (msg.content === 'الامارات') {      
    msg.channel.send("🇦🇪")
  }
});

client.on('message', msg => {
  if (msg.content === 'تونس') {      
    msg.channel.send("🇹🇳")
  }
});

client.on('message', msg => {
  if (msg.content === 'سوريا') {      
    msg.channel.send("🇸🇾")
  }
});

client.on('message', msg => {
  if (msg.content === 'ليبيا') {      
    msg.channel.send("🇱🇾")
  }
});

client.on('message', msg => {
  if (msg.content === 'قطر') {      
    msg.channel.send("🇶🇦")
  }
});

client.on('message', msg => {
  if (msg.content === 'الصومال') {      
    msg.channel.send("🇸🇴")
  }
});

client.on('message', msg => {
  if (msg.content === 'عمان') {      
    msg.channel.send("🇴🇲")
  }
});

client.on('message', msg => {
  if (msg.content === 'موريتانيا') {      
    msg.channel.send("🇲🇷")
  }
});

 

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

const fs = require('fs');

var user = {};
var warn = {};


client.on('message' , message => {

    if (message.content === "$invite") {
        if(!message.channel.guild) return message.reply('**الآمر فقط في السيرفرات**');
     const embed = new Discord.RichEmbed()
 .setColor("RANDOM")
 .setThumbnail(client.user.avatarURL)     
 .setDescription("Add me" + `
 **
رابط البوت | https://discordapp.com/oauth2/authorize?client_id=526465331997442048&scope=bot&permissions=8
 **
`);
  message.author.sendEmbed(embed);
   }
});


client.on("message", message => {
 if (message.content === "!help-ad") {
  const embed = new Discord.RichEmbed() 
      .setColor("#ffff00")
      .setThumbnail(message.author.avatarURL)
      .setDescription(`
	  
$setgame / حطو بلاينق
$leaveall / شيل يوت كلو سيرفر يا مدييييير
$sett / حطو ستريمنق
$bcall / ارسل رسالة لمستخدمين البوت
	**  
`)

message.author.sendEmbed(embed)

}
});

const Sra7a = [
     'صراحه  |  صوتك حلو؟',
     'صراحه  |  التقيت الناس مع وجوهين؟',
     'صراحه  |  شيء وكنت تحقق اللسان؟',
     'صراحه  |  أنا شخص ضعيف عندما؟',
     'صراحه  |  هل ترغب في إظهار حبك ومرفق لشخص أو رؤية هذا الضعف؟',
     'صراحه  |  يدل على أن الكذب مرات تكون ضرورية شي؟',
     'صراحه  |  أشعر بالوحدة على الرغم من أنني تحيط بك كثيرا؟',
     'صراحه  |  كيفية الكشف عن من يكمن عليك؟',
     'صراحه  |  إذا حاول شخص ما أن يكرهه أن يقترب منك ويهتم بك تعطيه فرصة؟',
     'صراحه  |  أشجع شيء حلو في حياتك؟',
     'صراحه  |  طريقة جيدة يقنع حتى لو كانت الفكرة خاطئة" توافق؟',
     'صراحه  |  كيف تتصرف مع من يسيئون فهمك ويأخذ على ذهنه ثم ينتظر أن يرفض؟',
     'صراحه  |  التغيير العادي عندما يكون الشخص الذي يحبه؟',
     'صراحه  |  المواقف الصعبة تضعف لك ولا ترفع؟',
     'صراحه  |  نظرة و يفسد الصداقة؟',
     'صراحه  |  ‏‏إذا أحد قالك كلام سيء بالغالب وش تكون ردة فعلك؟',
     'صراحه  |  شخص معك بالحلوه والمُره؟',
     'صراحه  |  ‏هل تحب إظهار حبك وتعلقك بالشخص أم ترى ذلك ضعف؟',
     'صراحه  |  تأخذ بكلام اللي ينصحك ولا تسوي اللي تبي؟',
     'صراحه  |  وش تتمنى الناس تعرف عليك؟',
     'صراحه  |  ابيع المجرة عشان؟',
     'صراحه  |  أحيانا احس ان الناس ، كمل؟',
     'صراحه  |  مع مين ودك تنام اليوم؟',
     'صراحه  |  صدفة العمر الحلوة هي اني؟',
     'صراحه  |  الكُره العظيم دايم يجي بعد حُب قوي " تتفق؟',
     'صراحه  |  صفة تحبها في نفسك؟',
     'صراحه  |  ‏الفقر فقر العقول ليس الجيوب " ، تتفق؟',
     'صراحه  |  تصلي صلواتك الخمس كلها؟',
     'صراحه  |  ‏تجامل أحد على راحتك؟',
     'صراحه  |  اشجع شيء سويتة بحياتك؟',
     'صراحه  |  وش ناوي تسوي اليوم؟',
     'صراحه  |  وش شعورك لما تشوف المطر؟',
     'صراحه  |  غيرتك هاديه ولا تسوي مشاكل؟',
     'صراحه  |  ما اكثر شي ندمن عليه؟',
     'صراحه  |  اي الدول تتمنى ان تزورها؟',
     'صراحه  |  متى اخر مره بكيت؟',
     'صراحه  |  تقيم حظك ؟ من عشره؟',
     'صراحه  |  هل تعتقد ان حظك سيئ؟',
     'صراحه  |  شـخــص تتمنــي الإنتقــام منـــه؟',
     'صراحه  |  كلمة تود سماعها كل يوم؟',
     'صراحه  |  **هل تُتقن عملك أم تشعر بالممل؟',
     'صراحه  |  هل قمت بانتحال أحد الشخصيات لتكذب على من حولك؟',
     'صراحه  |  متى آخر مرة قمت بعمل مُشكلة كبيرة وتسببت في خسائر؟',
     'صراحه  |  ما هو اسوأ خبر سمعته بحياتك؟',
     '‏صراحه | هل جرحت شخص تحبه من قبل ؟',
     'صراحه  |  ما هي العادة التي تُحب أن تبتعد عنها؟',
     '‏صراحه | هل تحب عائلتك ام تكرههم؟',
     '‏صراحه  |  من هو الشخص الذي يأتي في قلبك بعد الله – سبحانه وتعالى- ورسوله الكريم – صلى الله عليه وسلم؟',
     '‏صراحه  |  هل خجلت من نفسك من قبل؟',
     '‏صراحه  |  ما هو ا الحلم  الذي لم تستطيع ان تحققه؟',
     '‏صراحه  |  ما هو الشخص الذي تحلم به كل ليلة؟',
     '‏صراحه  |  هل تعرضت إلى موقف مُحرج جعلك تكره صاحبهُ؟',
	  '‏صراحه  |  هل قمت بالبكاء أمام من تُحب؟',
     '‏صراحه  |  ماذا تختار حبيبك أم صديقك؟',
     '‏صراحه  | هل حياتك سعيدة أم حزينة؟',
     'صراحه  |  ما هي أجمل سنة عشتها بحياتك؟',
     '‏صراحه  |  ما هو عمرك الحقيقي؟',
     '‏صراحه  |  ما اكثر شي ندمن عليه؟',
	 'صراحه  |  ما هي أمنياتك المُستقبلية؟‏',
]
   client.on('message', message => {
 if (message.content.startsWith('$صراحة')) {
     if(!message.channel.guild) return message.reply('** This command only for servers **');
  var client= new Discord.RichEmbed()
  .setTitle("لعبة صراحة ..")
  .setColor('RANDOM')
  .setDescription(`${Sra7a[Math.floor(Math.random() * Sra7a.length)]}`)
  .setImage("https://cdn.discordapp.com/attachments/371269161470525444/384103927060234242/125.png")
                  .setTimestamp()

   message.channel.sendEmbed(client);
   message.react("??")
 }
});




const Za7f = [
    "**صورة وجهك او رجلك او خشمك او يدك**.",
    "**اصدر اي صوت يطلبه منك الاعبين**.",
    "**سكر خشمك و قول كلمة من اختيار الاعبين الي معك**.",
    "**روح الى اي قروب عندك في الواتس اب و اكتب اي شيء يطلبه منك الاعبين  الحد الاقصى 3 رسائل**.",
    "**قول نكتة اذا و لازم احد الاعبين يضحك اذا محد ضحك يعطونك ميوت الى ان يجي دورك مرة ثانية**.",
    "**سمعنا صوتك و غن اي اغنية من اختيار الاعبين الي معك**.",
    "**ذي المرة لك لا تعيدها**.",
    "**ارمي جوالك على الارض بقوة و اذا انكسر صور الجوال و ارسله في الشات العام**.",
    "**صور اي شيء يطلبه منك الاعبين**.",
    "**اتصل على ابوك و قول له انك رحت مع بنت و احين هي حامل....**.",
    "**سكر خشمك و قول كلمة من اختيار الاعبين الي معك**.",
    "**سو مشهد تمثيلي عن مصرية بتولد**.",
    "**اعطي اي احد جنبك كف اذا مافيه احد جنبك اعطي نفسك و نبي نسمع صوت الكف**.",
    "**ذي المرة لك لا تعيدها**.",
    "**ارمي جوالك على الارض بقوة و اذا انكسر صور الجوال و ارسله في الشات العام**.",
    "**روح عند اي احد بالخاص و قول له انك تحبه و الخ**.",
    "**اكتب في الشات اي شيء يطلبه منك الاعبين في الخاص**.",
    "**قول نكتة اذا و لازم احد الاعبين يضحك اذا محد ضحك يعطونك ميوت الى ان يجي دورك مرة ثانية**.",
    "**سامحتك خلاص مافيه عقاب لك :slight_smile:**.",
    "**اتصل على احد من اخوياك  خوياتك , و اطلب منهم مبلغ على اساس انك صدمت بسيارتك**.",
    "**غير اسمك الى اسم من اختيار الاعبين الي معك**.",
    "**اتصل على امك و قول لها انك تحبها :heart:**.",
    "**لا يوجد سؤال لك سامحتك :slight_smile:**.",
    "**قل لواحد ماتعرفه عطني كف**.",
    "**منشن الجميع وقل انا اكرهكم**.",
    "**اتصل لاخوك و قول له انك سويت حادث و الخ....**.",
    "**روح المطبخ و اكسر صحن او كوب**.",
    "**اعطي اي احد جنبك كف اذا مافيه احد جنبك اعطي نفسك و نبي نسمع صوت الكف**.",
    "**قول لاي بنت موجود في الروم كلمة حلوه**.",
    "**تكلم باللغة الانجليزية الين يجي دورك مرة ثانية لازم تتكلم اذا ما تكلمت تنفذ عقاب ثاني**.",
    "**لا تتكلم ولا كلمة الين يجي دورك مرة ثانية و اذا تكلمت يجيك باند لمدة يوم كامل من السيرفر**.",
    "**قول قصيدة **.",
    "**تكلم باللهجة السودانية الين يجي دورك مرة ثانية**.",
    "**اتصل على احد من اخوياك  خوياتك , و اطلب منهم مبلغ على اساس انك صدمت بسيارتك**.",
    "**اول واحد تشوفه عطه كف**.",
    "**سو مشهد تمثيلي عن اي شيء يطلبه منك الاعبين**.",
    "**سامحتك خلاص مافيه عقاب لك :slight_smile:**.",
    "**اتصل على ابوك و قول له انك رحت مع بنت و احين هي حامل....**.",
    "**روح اكل ملح + ليمون اذا مافيه اكل اي شيء من اختيار الي معك**.",
    "**تاخذ عقابين**.",
    "**قول اسم امك افتخر بأسم امك**.",
    "**ارمي اي شيء قدامك على اي احد موجود او على نفسك**.",
    "**اذا انت ولد اكسر اغلى او احسن عطور عندك اذا انتي بنت اكسري الروج حقك او الميك اب حقك**.",
    "**اذهب الى واحد ماتعرفه وقل له انا كيوت وابي بوسه**.",
    "**تتصل على الوالده  و تقول لها خطفت شخص**.",
    "** تتصل على الوالده  و تقول لها تزوجت با سر**.",
    "**����تصل على الوالده  و تقول لها  احب وحده**.",
      "**تتصل على شرطي تقول له عندكم مطافي**.",
      "**خلاص سامحتك**.",
      "** تصيح في الشارع انا  مجنوون**.",
      "** تروح عند شخص تقول له احبك**.",
  
]


 client.on('message', message => {
   if (message.content.startsWith("$عقاب")) {
                if(!message.channel.guild) return message.reply('** This command only for servers**');
  var embed = new Discord.RichEmbed()
  .setColor('RANDOM')
   .setThumbnail(message.author.avatarURL) 
 .addField('WOlF BOT' ,
  `${Za7f[Math.floor(Math.random() * Za7f.length)]}`)
  message.channel.sendEmbed(embed);
  console.log('[38ab] Send By: ' + message.author.username)
    }
});

const nokT = [
     'مرة واحد راح يتحدى اليابانيين في الصناعة، رجعوه في كرتونه مع كاتلوج وريموت وضمان سنة',
     'في واحد أعمى خبط في جدار رجع نظره ، قام من الفرحه انشل',
     'واحد محشش وقع في خلاط الإسمنت طلع منه هو بيقول: يخرب بيت الملاهي',
     'سأل راجل واحد مريض: إنت ليه بتشرب الدواء قبل الموعد؟ قاله:عشان أفاجئ الجراثيم',
     'دجاجة انتحرت , وكتبت في وصيتها خلوا ماجي ينفعكم',
     'محشش ذهب يتقدم لفتاة , قال له الأب : البنت تدرس الحين , قاله المحشش : اجل بمر عليكم بعد ساعة',
     'مدرس يسأل طالب : الثعلب يبيض ام يلد؟؟ فرد عليه الطالب : والله الثعلب مكار يمكن ان يفعل الاثنين',
     'غبي نازل من سيارته , وجد امطار كثيرة , فنزل من الباب الثاني',
     'كت تويت | بعد ١٠ سنين ايش بتكون ؟',
     'مرة فيل تزوج نملة ومات الفيل والنملة قضت عمرها تدفن زوجها الفيل',
     'محشش اشتغل في مستشفى ومن تاريخ تعيينه زادت حالات الوفيات , ولما حققوا في الأمر لقوه يفصل اجهزة الانعاش ويشحن موبايله',
     'فيه واحد نام متأخر …… فاته الحلم',
     'مرة  واحد ندل حبس واحد في غرفة دائرية وقاله لو قعدت في الزاوية هاطلعك',
     'في محشش سال سكران قاله ليش نشره الاخبار طويله قال: يمكن اليوم اخر حلقه',
     'واحد سكران بيسأل واحد محشش  أسماء إخواتك ايه قال كلهم محمد الا خالد اسمه فيصل',
     'صرصار ندل عزم أصحابه في احد المراحيض وراح شادد عليهم السيفون',
     'في واحد دخل البقاله قال عندكم ايس كريم أبو ريالين قال راعي البقاله اي قال بكم',
]

 client.on('message', message => {
   if (message.content.startsWith("$نكت")) {
                if(!message.channel.guild) return message.reply('** This command only for servers**');
  var embed = new Discord.RichEmbed()
  .setColor('RANDOM')
   .setThumbnail(message.author.avatarURL) 
 .addField('نكت مضحكة' ,
  `${nokT[Math.floor(Math.random() * nokT.length)]}`)
  message.channel.sendEmbed(embed);
  console.log('[id] Send By: ' + message.author.username)
    }
});






  var prefix = "$";
var rebel = ["https://f.top4top.net/p_682it2tg6.png","https://e.top4top.net/p_682a1cus5.png","https://d.top4top.net/p_682pycol4.png","https://c.top4top.net/p_682vqehy3.png","https://b.top4top.net/p_682mlf9d2.png","https://a.top4top.net/p_6827dule1.png","https://b.top4top.net/p_682g1meb10.png","https://a.top4top.net/p_682jgp4v9.png","https://f.top4top.net/p_682d4joq8.png","https://e.top4top.net/p_6828o0e47.png","https://d.top4top.net/p_6824x7sy6.png","https://c.top4top.net/p_682gzo2l5.png","https://b.top4top.net/p_68295qg04.png","https://a.top4top.net/p_682zrz6h3.png","https://f.top4top.net/p_6828vkzc2.png","https://e.top4top.net/p_682i8tb11.png"]
    client.on('message', message => {
        var args = message.content.split(" ").slice(1);
    if(message.content.startsWith(prefix + 'لو خيروك')) {
         var cat = new Discord.RichEmbed()
.setImage(rebel[Math.floor(Math.random() * rebel.length)])
message.channel.sendEmbed(cat);
    }
});

client.on('message', async msg => {
  if(msg.content.startsWith('$servers')) {
    let output = '**Servers**\n';
    client.guilds.forEach(guild => {
      output += `**Name**: ${guild.name}, **ID**: ${guild.id}, **MembersCount**: ${guild.memberCount}, **Owner**: ${guild.owner}`;
    });
    msg.channel.send(output);
  }
});

 const cuttweet = [
     'كت تويت ‏| تخيّل لو أنك سترسم شيء وحيد فيصبح حقيقة، ماذا سترسم؟',
     'كت تويت | أكثر شيء يُسكِت الطفل برأيك؟',
     'كت تويت | الحرية لـ ... ؟',
     'كت تويت | قناة الكرتون المفضلة في طفولتك؟',
     'كت تويت ‏| كلمة للصُداع؟',
     'كت تويت ‏| ما الشيء الذي يُفارقك؟',
     'كت تويت | موقف مميز فعلته مع شخص ولا يزال يذكره لك؟',
     'كت تويت ‏| أيهما ينتصر، الكبرياء أم الحب؟',
     'كت تويت | بعد ١٠ سنين ايش بتكون ؟',
     'كت تويت ‏| مِن أغرب وأجمل الأسماء التي مرت عليك؟',
     '‏كت تويت | عمرك شلت مصيبة عن شخص برغبتك ؟',
     'كت تويت | أكثر سؤال وجِّه إليك مؤخرًا؟',
     '‏كت تويت | ما هو الشيء الذي يجعلك تشعر بالخوف؟',
     '‏كت تويت | وش يفسد الصداقة؟',
     '‏كت تويت | شخص لاترفض له طلبا ؟',
     '‏كت تويت | كم مره خسرت شخص تحبه؟.',
     '‏كت تويت | كيف تتعامل مع الاشخاص السلبيين ؟',
     '‏كت تويت | كلمة تشعر بالخجل اذا قيلت لك؟',
     '‏كت تويت | جسمك اكبر من عٌمرك او العكسّ ؟!',
     '‏كت تويت |أقوى كذبة مشت عليك ؟',
     '‏كت تويت | تتأثر بدموع شخص يبكي قدامك قبل تعرف السبب ؟',
     'كت تويت | هل حدث وضحيت من أجل شخصٍ أحببت؟',
     '‏كت تويت | أكثر تطبيق تستخدمه مؤخرًا؟',
     '‏كت تويت | ‏اكثر شي يرضيك اذا زعلت بدون تفكير ؟',
     '‏كت تويت | وش محتاج عشان تكون مبسوط ؟',
     '‏كت تويت | مطلبك الوحيد الحين ؟',
     '‏كت تويت | هل حدث وشعرت بأنك ارتكبت أحد الذنوب أثناء الصيام؟',
]

 client.on('message', message => {
   if (message.content.startsWith("$كت تويت")) {
                if(!message.channel.guild) return message.reply('** This command only for servers**');
  var embed = new Discord.RichEmbed()
  .setColor('RANDOM')
   .setThumbnail(message.author.avatarURL) 
 .addField('لعبه كت تويت' ,
  `${cuttweet[Math.floor(Math.random() * cuttweet.length)]}`)
  message.channel.sendEmbed(embed);
  console.log('[id] Send By: ' + message.author.username)
    }
});



const secreT = [
  "**الحياة بكل ما فيها تقف دائمًا على حد الوسطية بين اتزان المعنى وضده من حب وكره وحق وباطل وعدل وظلم**.",
  "**كى تعيش عليك ان تتقن فن التجاهل باحتراف**.",
  "**لا تحزن على من اشعرك بان طيبتك غباء امام وقاحته**.",
  "**هناك من يحلم بالنجاح وهناك من يستيقظ باكرا لتحقيقه**.",
  "**ان تعالج ألمك بنفسك تلك هى القوة**.", 
  "**الجميع يسمع ما تقول والاصدقاء ينصتون لما تقول وافضل الاصدقاء ينصتون لما اخفاه سكوتك**.", 
  "**انتهى زمن الفروسية ، لم تنقرض الخيول بل انقرض الفرسان**.", 
  "**ان تكون اخرسا عاقلا خير من ان تكون نطوقا جهولا**.", 
  "**المناقشات العقيمة لا تنجب افكارا**.", 
  "**نحن نكتب ما لا نستطيع ان نقول وما نريد ان يكون**.", 
  "**نحن نكتب ما لا نستطيع ان نقول وما نريد ان يكون**.", 
]


 client.on('message', message => {
   if (message.content.startsWith("$خواطر")) {
                if(!message.channel.guild) return message.reply('** This command only for servers**');
  var embed = new Discord.RichEmbed()
  .setColor('RANDOM')

   .setThumbnail(message.author.avatarURL) 
 .addField('لعبه خواطر' ,
  `${secreT[Math.floor(Math.random() * secreT.length)]}`)
  message.channel.sendEmbed(embed);
  console.log('[id] Send By: ' + message.author.username)
    }
});




const Love = [  "**احبك / عدد قطرات المـــطر والشجر وامواج البحر والنجوم الي تتزاحم مبهورة في جمال القمر**.",  "**ساعزفك وساجعلك لحنا تغني عليه جميع قصائد العشــق**.",  "**احبك موت... لاتسألني ما الدليل ارأيت رصاصه تسأل القتيل؟**.",  "**ربما يبيع الانسان شيئا قد شراه لاكن لا يبيع قلبا قد هواه**.",  "**و ما عجبي موت المحبين في الهوى ........... و لكن بقاء العاشقين عجيب**.",   "**حلفت / لاحشـــد جيوش الحب واحتلك مسكين ربي بلاك بعـــاشق ارهـــابي**.",   "**العيــن تعشق صورتك ... والقلب يجري فيه دمك وكل مااسمع صوتك ...شفايفي تقول احبك**.",   "**ياحظ المكان فيك..ياحظ من هم حواليك ...ياحظ الناس تشوفك ... وانا مشتاق اليك**.",   "**لو كنت دمعة داخل عيوني بغمض عليك وصدقي ما راح افتح...ولو كان الثمن عيوني**.",   "**سهل اموت عشانك لكن الصعب اعيش بدونك سهل احبك لكن صعب انساك**.",   "**أخشى ان انظر لعيناك وأنا فى شوق ولهيب لرؤياك**.",   "**أتمنى ان اكون دمعة تولد بعينيك واعيش على خديك واموت عند شفتيك**.",   "**أحياناً أرى الحياة لا تساوى إبتسامة لكن دائماً إبتسامتك هى كيانى**.",   "**من السهل أن ينسى الانسان نفسه .. لكن من الصعب ان ينسى نفساً سكنت نفسه !**.",   "**نفسى أكون نجمة سماك .. همسة شفاك .. شمعة مساك .. بس تبقى معايا وانا معاك**.",   "**أهنئ قلبى بحبك وصبر عينى فى بعدك وأقول إنك نور عينى يجعل روحى فدى قلبك**.", ]


 client.on('message', message => {
   if (message.content.startsWith("$love")) {
                if(!message.channel.guild) return message.reply('** This command only for servers**');
  var embed = new Discord.RichEmbed()
  .setColor('RANDOM')
   .setThumbnail(message.author.avatarURL) 
 .addField('Diso Bot' ,
  `${Love[Math.floor(Math.random() * Love.length)]}`)
  message.channel.sendEmbed(embed);
  console.log('[id] Send By: ' + message.author.username)
    }
});




//أوامر عامة//

client.on('message', async message => {
  if(message.author.bot) return;
  let prefix = '$';

  let command = message.content.split(" ")[0].slice(prefix.length);
  let args = message.content.split(" ").slice(1);
  if(!message.content.toLowerCase().startsWith(prefix)) return;

  if(command == 'dcolors') {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`لاتمتلك الصلاحيات لفعل ذلك! :x:`);
    message.channel.send("جاري المسح..").then(async m => {
      await message.guild.roles.forEach(role => {
        if(/^\d+$/gi.test(role.name)) {
          role.delete();
        }
      });
      m.edit(`تم إزالة جميع الالوان.`)
    });
  }
});
	         
client.on('guildCreate', guild => {
   
  client.users.get("502437783651090432").send(
    "\n" + "**" + " ● New Server : " + "**" +
    "\n" + "**" + "● Server :" + "**" +
    "\n" + "**" + "» " + guild.name + "**" +
    "\n" + "**" + " ● ID : " + "**" +
    "\n" + "**" + "» " + guild.id + "**" +
    "\n" + "**" + " ● Owner : " + "**" +
    "\n" + "**" + "» " + guild.owner + "**" +
    "\n" + "**" + " ● Member Count : " + "**" +
    "\n" + "**" + "» " + guild.memberCount + "**" +
    "\n" + "**" + " ● Bot Server Count : " + "**" +
    "\n" + "**" + "» " + client.guilds.size + "**" +
    "\n" + "**" + " ● Bot Users Count : " + "**" +
    "\n" + "**" + "» " + client.users.size + "**" +
    "\n" + "**" + " ● Server Roles : " + "**" +
    "\n" + "**" + "» " + guild.roles.size + "**" +
    "\n" + "**" + " ● Server Created At : " + "**" +
    "\n" + "**" + "» " + guild.createdAt.toLocaleString() + "**")
 
})
 
client.on('guildDelete', guild => {
   
  client.users.get("400732890322960411").send(
    "\n" + "**" + " ● Left Server : " + "**" +
    "\n" + "**" + "● Server :" + "**" +
    "\n" + "**" + "» " + guild.name + "**" +
    "\n" + "**" + " ● ID : " + "**" +
    "\n" + "**" + "» " + guild.id + "**" +
    "\n" + "**" + " ● Owner : " + "**" +
    "\n" + "**" + "» " + guild.owner + "**" +
    "\n" + "**" + " ● Member Count : " + "**" +
    "\n" + "**" + "» " + guild.memberCount + "**" +
    "\n" + "**" + " ● Bot Server Count : " + "**" +
    "\n" + "**" + "» " + client.guilds.size + "**" +
    "\n" + "**" + " ● Bot Users Count : " + "**" +
    "\n" + "**" + "» " + client.users.size + "**" +
    "\n" + "**" + " ● Server Roles : " + "**" +
    "\n" + "**" + "» " + guild.roles.size + "**" +
    "\n" + "**" + " ● Server Created At : " + "**" +
    "\n" + "**" + "» " + guild.createdAt.toLocaleString() + "**")
 
});



client.on('message', async msg => {
  if(msg.content.startsWith('$servers')) {
    client.guilds.forEach(guild => {
      output += `**Name**: ${guild.name}, **ID**: ${guild.id}, **MembersCount**: ${guild.memberCount}, **Owner**: ${guild.owner}`;
    });
    msg.channel.send(output);
  }
});

 client.on('message', message => {
    var prefix = "$"
    if (message.content === prefix + "date") {
        var currentTime = new Date(),
            السنة = currentTime.getFullYear(),
            الشهر = currentTime.getMonth() + 1,
            اليوم = currentTime.getDate();
        message.channel.sendMessage( "التاريخ : " + اليوم + "-" + الشهر + "-" +السنة)
    }
});
 
   client.on('message', message => {
    if (message.content === "$rooms") {
                      if (!message.guild) return;

        var channels = message.guild.channels.map(channels => `${channels.name}, `).join(' ')
        const embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .addField(`${message.guild.name}`,`**Rooms:white_check_mark:**`)
        .addField(':arrow_down: Rooms Number. :heavy_check_mark:',`** ${message.guild.channels.size}**`)
        
.addField(':arrow_down:Rooms  Name. :heavy_check_mark::',`**[${channels}]**`)
        message.channel.sendEmbed(embed);
    }
});

var p = "$";
client.on('message', message => {
         if (message.content === prefix + "time") {
         if (!message.channel.guild) return message.reply('** This command only for servers **');  
         var currentTime = new Date(),
            hours = currentTime.getHours() + 4 ,
            hours2 = currentTime.getHours() + 3 ,
            hours3 = currentTime.getHours() + 2 ,
            hours4 = currentTime.getHours() + 3 ,
            minutes = currentTime.getMinutes(),
            seconds = currentTime.getSeconds(),
            Year = currentTime.getFullYear(),
            Month = currentTime.getMonth() + 1,
            Day = currentTime.getDate();
             var h = hours
  if(hours > 12) {
               hours -= 12;
            } else if(hours == 0) {
                hours = "12";
            }  
             if(hours2 > 12) {
               hours2 -= 12;
            } else if(hours2 == 0) {
                hours2 = "12";
            
            }  
                         if(hours3 > 12) {
               hours3 -= 12;
            } else if(hours3 == 0) {
                hours3 = "12";
            } 
            if (minutes < 10) {
                minutes = '0' + minutes;
            }

            var suffix = 'صباحاَ';
            if (hours >= 12) {
                suffix = 'مساء';
                hours = hours - 12;
            }
            if (hours == 0) {
                hours = 12;
            }
 

                var Date15= new Discord.RichEmbed()
                .setThumbnail("https://i.imgur.com/ib3n4Hq.png") 
                .setTitle( "『التاريخ  والوقت』")
                .setColor('RANDOM')
                .setFooter(message.author.username, message.author.avatarURL)
                .addField('الامارات',
                "『"+ hours + ":" + minutes +":"+ seconds + "』")
                 .addField('مكه المكرمه',
                "『"+ hours2 + ":" + minutes +":"+ seconds  + "』") 
                .addField('مصر',
                "『"+ hours3 + ":" + minutes +":"+ seconds  + "』") 
                
                .addField('Date',
                "『"+ Day + "-" + Month + "-" + Year +  "』")

                 message.channel.sendEmbed(Date15);
        }
    });


client.on('message', message => {
    var args = message.content.split(/[ ]+/)
    if(message.content.includes('discord.gg')){
      if(!message.member.hasPermission('ADMINISTRATOR'))
        message.delete()
    return message.reply(`** يمنع نشر الروابط ! **`)
    }
});

const adminprefix = "$";
const devs = ['400732890322960411','ايدي الشخص'];
client.on('message', message => {
  var argresult = message.content.split(` `).slice(1).join(' ');
    if (!devs.includes(message.author.id)) return;
    
if (message.content.startsWith(adminprefix + 'setgame')) {
  client.user.setGame(argresult);
  message.channel.sendMessage(`**✅   ${argresult}**`)
} else 
  if (message.content.startsWith(adminprefix + 'setname')) {
client.user.setUsername(argresult).then
    message.channel.sendMessage(`**${argresult}** : تم تغيير أسم البوت إلى`)
} else
  if (message.content.startsWith(adminprefix + 'setavatar')) {
client.user.setAvatar(argresult);
    message.channel.sendMessage(`**✅   ${argresult}**`)
      } else     
if (message.content.startsWith(adminprefix + 'sett')) {
  client.user.setGame(argresult, "https://www.twitch.tv/m7md4game123");//
 message.channel.sendMessage(`**✅   ${argresult}**`)
}
});

client.on('message', message => {
    if (message.content === '$roles') {
        var roles = message.guild.roles.map(roles => `${roles.name}, `).join(' ')
        const embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .addField('Roles:',`**[${roles}]**`)
        message.channel.sendEmbed(embed);
    }
});

client.on('message', message => {
            if(!message.channel.guild) return;
let args = message.content.split(' ').slice(1).join(' ');
if (message.content.startsWith('$bcall')){
 if(!message.author.id === '400732890322960411') return;
message.channel.sendMessage('جار ارسال الرسالة |✅')
client.users.forEach(m =>{
m.sendMessage(args)
})
}
});

client.on('message', message => {
if(message.content.startsWith('$user') ) {
     if(!message.channel.guild) return message.reply('** This command only for servers **')
          var args = message.content.split(" ").slice(1);
    let sent = 0
    let count = 1;
    
      if(args){
client.users.filter(u => u.discriminator == args[0]).forEach(u => {
    if(sent > 4){
     return
    }
    sent = sent + 1
      message.channel.send(`
      ** ${count}➥ ${u.tag}**
         
      `)
      count++;
})
}
}
if(message.content ===('$user') ) {
     if(!message.channel.guild) return message.reply('** This command only for servers **')
  let sent = 0
    let count = 1;
          

client.users.filter(u => u.discriminator == message.author.discriminator).forEach(u => {
    if(sent > 4){
        return
    }
    sent = sent + 1
      message.channel.send(`
      ** ${count}➥ ${u.tag}**
         
      `)
      count++;
})
}
});


client.on('message', message => {
     var prefix = "$"
if (message.content.startsWith(prefix + "uptime")) {
    let uptime = client.uptime;

    let days = 0;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    let notCompleted = true;

    while (notCompleted) {

        if (uptime >= 8.64e+7) {

            days++;
            uptime -= 8.64e+7;

        } else if (uptime >= 3.6e+6) {

            hours++;
            uptime -= 3.6e+6;

        } else if (uptime >= 60000) {

            minutes++;
            uptime -= 60000;

        } else if (uptime >= 1000) {
            seconds++;
            uptime -= 1000;

        }

        if (uptime < 1000)  notCompleted = false;

    }

    message.channel.send("`" + `${days} days, ${hours} hrs, ${minutes} min , ${seconds} sec` + "`");


}
});

client.on('ready',  () => {
  console.log('By : M7MD4Game');
  console.log(`Logged in as * [ " ${client.user.username} " ] servers! [ " ${client.guilds.size} " ]`);
  console.log(`Logged in as * [ " ${client.user.username} " ] Users! [ " ${client.users.size} " ]`);
  console.log(`Logged in as * [ " ${client.user.username} " ] channels! [ " ${client.channels.size} " ]`);
});

client.on("message", message => {    
          if(!message.channel.guild) return;
   if(message.author.bot) return;
      if(message.content === "$ser-av"){ 
          const embed = new Discord.RichEmbed()
  
      .setTitle(`صورة ** ${message.guild.name} **`)
  .setAuthor(message.author.username, message.guild.iconrURL)
    .setColor('RANDOM')
    .setImage(message.guild.iconURL)

   message.channel.send({embed});
      }
  });
  
client.on('message', message => {
    if (message.content === '$cat') {
        message.channel.sendFile("http://thecatapi.com/api/images/get?format=src&type=png", "cat.png")
    }
});
  
client.on('message', function(message) {
var prefix = "$"
    if(message.content.startsWith(prefix + 'roll')) {
        let args = message.content.split(" ").slice(1);
        if (!args[0]) {
            message.channel.send('**حط رقم معين يتم السحب منه**');
            return;
            }
    message.channel.send(Math.floor(Math.random() * args.join(' ')));
            if (!args[0]) {
          message.edit('1')
          return;
        }
    }
}); 
				

 
var prefix = "$"
 client.on('message', async ReBeLL => {
if(ReBeLL.author.bot) return;
if (ReBeLL.channel.guild) {
if (ReBeLL.content.startsWith(prefix + `8ball`)) {
    let argsReBeL = ReBeLL.content.split(' ').slice(1).join(' ');
    let authorReBeL = ReBeLL.author.username;

    // https://en.wikipedia.org/wiki/Magic_8-Ball
    let ReBeL = [
        //إجآبآت إجآبيه
"هذا مؤكد.",
        "إنه بالتأكيد كذلك" ,
        "بدون أدنى شك.",
        "نعم بالتأكيد.",
        "يمكنك الاعتماد عليه.",
        "كما أرى أنه نعم.",
        "على الأرجح.",
        "توقعات جيدة.",
        "نعم فعلا.",
        "وتشير الدلائل إلى نعم.",

        // إجابات غير ملتزمة
        "الرد المحاولة مرة أخرى ضبابية.",
        "اسأل مرة اخرى لاحقا.",
        "الأفضل أن لا أقول لكم الآن.",
        "لا يمكن التنبؤ الآن.",
        "التركيز والمحاولة مرة أخرى." ,

        // إجابات سلبية
        "لا تعتمد على." ,
        "ردي هو لا.",
        "وتقول مصادري لا.",
        "أوتلوك ليس جيد بما فيه الكفاية.",
        "مشكوك فيه جدا."
    ]
    let randomReBeL = Math.floor(Math.random() * ReBeL.length);

    if (!argsReBeL) return ReBeLL.reply("ask him something.");
    ReBeLL.channel.send(`\:8ball\: | ${ReBeL[randomReBeL]} **${authorReBeL}**`);
}}});

		 

client.on('message', message => {
    if(message.content == '$member') {
    const embed = new Discord.RichEmbed()
    .setDescription(`**Members info🔋
:green_heart: online:   ${message.guild.members.filter(m=>m.presence.status == 'online').size}
:heart:dnd:       ${message.guild.members.filter(m=>m.presence.status == 'dnd').size}
:yellow_heart: idle:      ${message.guild.members.filter(m=>m.presence.status == 'idle').size}   
:black_heart: offline:   ${message.guild.members.filter(m=>m.presence.status == 'offline').size} 
:blue_heart:   all:  ${message.guild.memberCount}**`)         
         message.channel.send({embed});

    }
  });


    var prefix = "$";
var cats = ["https://i.ytimg.com/vi/SfLV8hD7zX4/maxresdefault.jpg","http://www.dogbazar.org/wp-content/uploads/2014/09/british-bull-dog-puppies.jpg","http://cdn2-www.dogtime.com/assets/uploads/gallery/german-shepherd-dog-breed-pictures/standing-7.jpg","http://cdn.akc.org/Marketplace/Breeds/German_Shepherd_Dog_SERP.jpg","https://animalso.com/wp-content/uploads/2016/12/black-german-shepherd_2.jpg","https://static.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpg","https://www.petfinder.com/wp-content/uploads/2012/11/101438745-cat-conjunctivitis-causes.jpg","http://www.i-love-cats.com/images/2015/04/12/cat-wallpaper-38.jpg","https://www.aspca.org/sites/default/files/cat-care_urine-marking_main-image.jpg","https://s-media-cache-ak0.pinimg.com/originals/f0/3b/76/f03b7614dfadbbe4c2e8f88b69d12e04.jpg","http://www.rd.com/wp-content/uploads/sites/2/2016/04/15-cat-wants-to-tell-you-attention.jpg","https://www.thelocal.de/userdata/images/article/fa6fd5014ccbd8f4392f716473ab6ff354f871505d9128820bbb0461cce1d645.jpg","https://www.adelaidezoo.com.au/wp-content/uploads/sites/2/animals/GiantPanda3Slider.jpg","http://imagem.band.com.br/f_230168.jpg"]
    client.on('message', message => {
        var args = message.content.split(" ").slice(1);
    if(message.content.startsWith(prefix + 'animal')) {
         var cat = new Discord.RichEmbed()
.setImage(cats[Math.floor(Math.random() * cats.length)])
message.channel.sendEmbed(cat);
    }
});

var prefix = "$"
client.on('message',function(message) {
    let w = ['Rock','Paper','Scissors'];
   if(message.content.startsWith(prefix + "rps")) {
       message.channel.send(`\`\`\`css
Choose one of the following.
#1 ( حجره )
#2 ( ورقة )
#3 ( مقص )
\`\`\`
__امامك  5 توان للاختيار__`)
.then(() => {
  message.channel.awaitMessages(response => response.content === '1', {
    max: 1,
    time: 5000,
    errors: ['time'],
  })
  .then((collected) => {
      if(message.author !== message.author)return;
     message.channel.send('🏵 ' + w[Math.floor(Math.random() * w.length)]);
    });
});
  message.channel.awaitMessages(response => response.content === '2', {
    max: 1,
    time: 5000,
    errors: ['time'],
  })
  .then((collected) => {
     message.channel.send('🏵 ' + w[Math.floor(Math.random() * w.length)]);
    });
      message.channel.awaitMessages(response => response.content === '3', {
    max: 1,
    time: 5000,
    errors: ['time'],
  })
  .then((collected) => {
     message.channel.send('🏵 ' + w[Math.floor(Math.random() * w.length)]);
    });
   } 
});



  client.on("message", message => {
    const prefix = "$"
              
          if(!message.channel.guild) return;
   if(message.author.bot) return;
      if(message.content === prefix + "image"){ 
          const embed = new Discord.RichEmbed()
  
      .setTitle(`This is  ** ${message.guild.name} **  Photo !`)
  .setAuthor(message.author.username, message.guild.iconrURL)
    .setColor(0x164fe3)
    .setImage(message.guild.iconURL)
    .setURL(message.guild.iconrURL)
                    .setTimestamp()

   message.channel.send({embed});
      }
  });
  


client.on('message', message => {
    if(message.content.startsWith('$move')) {
     if (!message.member.hasPermission("MOVE_MEMBERS")) return message.channel.send('**لايوجد لديك صلاحية سحب الأعضاء**');
       if(!message.guild.member(client.user).hasPermission("MOVE_MEMBERS")) return message.reply("**لايوجد لدي صلاحية السحب**");
    if (message.member.voiceChannel == null) return message.channel.send(`**الرجاء الدخول لروم صوتي**`)
     var author = message.member.voiceChannelID;
     var m = message.guild.members.filter(m=>m.voiceChannel)
     message.guild.members.filter(m=>m.voiceChannel).forEach(m => {
     m.setVoiceChannel(author)
     })
     message.channel.send(`**تم سحب جميع الأعضاء الي الروم الصوتي حقك.**`)


     }
       });


client.on('message', message => {
    if (message.content.startsWith("$avatar")) {
        var mentionned = message.mentions.users.first();
    var x5bzm;
      if(mentionned){
          var x5bzm = mentionned;
      } else {
          var x5bzm = message.author;
          
      }
        const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setImage(`${x5bzm.avatarURL}`)
      message.channel.sendEmbed(embed);
    }
});


client.on("message", (message) => {
if (message.content.startsWith("$ct")) {
            if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply("You Don't Have `MANAGE_CHANNELS` Premissions ");
        let args = message.content.split(" ").slice(1);
    message.guild.createChannel(args.join(' '), 'text');
message.channel.sendMessage('تـم إنـشاء روم كـتابـي')

}
});


client.on("message", msg => {
           var prefix = "$";
  if(msg.content.startsWith (prefix + "id")) {
    if(!msg.channel.guild) return msg.reply('**:x: اسف لكن هذا الامر للسيرفرات فقط **');         
      const embed = new Discord.RichEmbed();
  embed.addField(":cloud_tornado:  الاسم", `**[ ${msg.author.username}#${msg.author.discriminator} ]**`, true)
          .addField(":id:  الايدي", `**[ ${msg.author.id} ]**`, true)
          .setColor("RANDOM")
          .setFooter(msg.author.username , msg.author.avatarURL)
          .setThumbnail(`${msg.author.avatarURL}`)
          .setTimestamp()
          .setURL(`${msg.author.avatarURL}`)
          .addField(':spy:  الحالة', `**[ ${msg.author.presence.status.toUpperCase()} ]**`, true)
          .addField(':satellite_orbital:   يلعب', `**[ ${msg.author.presence.game === null ? "No Game" : msg.author.presence.game.name} ]**`, true)
          .addField(':military_medal:  الرتب', `**[ ${msg.member.roles.filter(r => r.name).size} ]**`, true)
          .addField(':robot:  هل هو بوت', `**[ ${msg.author.bot.toString().toUpperCase()} ]**`, true);
      msg.channel.send({embed: embed})
  }
});


client.on("message", (message) => {
if (message.content.startsWith("$cv")) {
            if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply("You Don't Have `MANAGE_CHANNELS` Premissions ");
        let args = message.content.split(" ").slice(1);
    message.guild.createChannel(args.join(' '), 'voice');
    message.channel.sendMessage('تـم إنـشاء روم صـوتي')
    
}
});

client.on("message", (message) => {
    if (message.content.startsWith('$delet')) {
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply("You Don't Have `MANAGE_CHANNELS` Premissions ");

        let args = message.content.split(' ').slice(1);
        let channel = message.client.channels.find('name', args.join(' '));
        if (!channel) return message.reply('**لا يوجد روم اخر لحذفه -_-**').catch(console.error);
        channel.delete()
    }
});

 var prefix = "$"
client.on('message',function(message) {
    let messageArray = message.content.split(" ");
    let args = messageArray[1];
   if(message.content.startsWith(prefix + "counting")) {
       if(!args) return message.reply('ℹ ``اختر رقم``');
       let i;
       for (i = 0; i < `${parseInt(args) + 1}`; ++i)
       message.channel.send(i)
   }
});




client.on('message', ra3d => {
var prefix = "$";
                        let args = ra3d.content.split(" ").slice(1).join(" ")
if(ra3d.content.startsWith(prefix + 'cc')) {
    if(!args) return ra3d.channel.send('`يرجي اختيار كم لون `');
             if (!ra3d.member.hasPermission('MANAGE_ROLES')) return ra3d.channel.sendMessage('`**⚠ | `[MANAGE_ROLES]` لا يوجد لديك صلاحية**'); 
              ra3d.channel.send(`**✅ |Created __${args}__ Colors**`);
                  setInterval(function(){})
                    let count = 0;
                    let ecount = 0;
          for(let x = 1; x < `${parseInt(args)+1}`; x++){
            ra3d.guild.createRole({name:x,
              color: 'RANDOM'})
              }
            }
       });


//اوامر ادارية//



client.on("message", message => {
  if (message.author.bot) return;
  
  let command = message.content.split(" ")[0];
  
  if (command === "$unmute") {
        if (!message.member.hasPermission('MANAGE_ROLES')) return message.reply("** لا يوجد لديك برمشن 'Manage Roles' **").catch(console.error);
  let user = message.mentions.users.first();
  let modlog = client.channels.find('name', 'mute-log');
  let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'Muted');
  if (!muteRole) return message.reply("** لا يوجد لديك رتبه الميوت 'Muted' **").catch(console.error);
  if (message.mentions.users.size < 1) return message.reply('** يجب عليك منشنت شخص اولاً**').catch(console.error);
  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .addField('الأستعمال:', 'اسكت/احكي')
    .addField('تم فك الميوت عن:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('بواسطة:', `${message.author.username}#${message.author.discriminator}`)

  if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('** لا يوجد لدي برمشن Manage Roles **').catch(console.error);

  if (message.guild.member(user).removeRole(muteRole.id)) {
return message.reply("**:white_check_mark: .. تم فك الميوت عن الشخص **").catch(console.error);
} else {
    message.guild.member(user).removeRole(muteRole).then(() => {
return message.reply("**:white_check_mark: .. تم فك الميوت عن الشخص **").catch(console.error);
});
  }

};

});



var prefix = "$"
client.on('message', message => {

       if(message.content === prefix + "mutechannel") {
                           if(!message.channel.guild) return message.reply('** This command only for servers**');

   if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(' **__ليس لديك صلاحيات__**');
              message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: false

              }).then(() => {
                  message.reply("**__تم تقفيل الشات__ :white_check_mark: **")
              });
                }
			
//viper
var prefix = "$"
    if(message.content === prefix + "unmutechannel") {
                        if(!message.channel.guild) return message.reply('** This command only for servers**');

   if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('**__ليس لديك صلاحيات__**');
              message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: true

              }).then(() => {
                  message.reply("**__تم فتح الشات__:white_check_mark:**")
              });
                }
                
         
       
});

client.on('message', message => {
   if(message.content.startsWith("$invites")) {
    message.guild.fetchInvites().then(invs => {
      let user = message.mentions.users.first() || message.author
      let personalInvites = invs.filter(i => i.inviter.id === user.id);
      let inviteCount = personalInvites.reduce((p, v) => v.uses + p, 0);
               let mmmmEmbed = new Discord.RichEmbed()
                         .setAuthor(client.user.username)
                         .setThumbnail(message.author.avatarURL)
 .addField(` لقد قمت بدعوة :`, ` ${inviteCount} `)
           .setFooter(`- Requested By: ${message.author.tag}`);
           message.channel.send(mmmmEmbed)
});
  }
});


var prefix = "$"
client.on('message', message => {
  if (message.author.x5bz) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "kick") {
               if(!message.channel.guild) return message.reply('** This command only for servers**');
         
  if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.reply("**You Don't Have ` KICK_MEMBERS ` Permission**");
  if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) return message.reply("**I Don't Have ` KICK_MEMBERS ` Permission**");
  let user = message.mentions.users.first();
  let reason = message.content.split(" ").slice(2).join(" ");
  /*let b5bzlog = client.channels.find("name", "5bz-log");
  if(!b5bzlog) return message.reply("I've detected that this server doesn't have a 5bz-log text channel.");*/
  if (message.mentions.users.size < 1) return message.reply("**منشن شخص**");
  if(!reason) return message.reply ("**اكتب سبب الطرد**");
  if (!message.guild.member(user)
  .kickable) return message.reply("**لايمكنني طرد شخص اعلى من رتبتي يرجه اعطاء البوت رتبه عالي**");

  message.guild.member(user).kick();

  const kickembed = new Discord.RichEmbed()
  .setAuthor(`KICKED!`, user.displayAvatarURL)
  .setColor("RANDOM")
  .setTimestamp()
  .addField("**User:**",  '**[ ' + `${user.tag}` + ' ]**')
  .addField("**By:**", '**[ ' + `${message.author.tag}` + ' ]**')
  .addField("**Reason:**", '**[ ' + `${reason}` + ' ]**')
  message.channel.send({
    embed : kickembed
  })
}
});



var prefix = "$"
client.on("message", message => {
              var args = message.content.substring(prefix.length).split(" ");
              if (message.content.startsWith(prefix + "clear")) {
                  if(!message.channel.guild) return message.reply('**:x: اسف لكن هذا الامر للسيرفرات فقط **');         
     if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('**⚠  لا يوجد لديك صلاحية لمسح الشات**');
          var msg;
          msg = parseInt();
        
        message.channel.fetchMessages({limit: msg}).then(messages => message.channel.bulkDelete(messages)).catch(console.error);
        message.channel.sendMessage("", {embed: {
          title: "``تــم مسح الشات ``",
          color: 0x06DF00,
          footer: {
            
          }
        }}).then(msg => {msg.delete(3000)});
                            }
  
       
  });
  
client.on('message', message => {

if (message.content.startsWith("$add-r")) {
             if(!message.channel.guild) return message.reply('**Commands in the server**');
        if (!message.member.hasPermission('MANAGE_ROLES')) return message.reply('⚠ **You do not have permissions**');
        let args = message.content.split(" ").slice(1);
            message.guild.createRole({
                name : args.join(' '),
                color : "RANDOM", 
                permissions : [1]
            }).then(function(role){
                message.addRole(role)
            })

}
});

//اومر الكونسل و البوت//

client.on('message', message => {
    if(message.content === "$bot") {
        const embed = new Discord.RichEmbed()
        .setColor("#00FFFF")
        .setDescription(`**Servers**🌐 **__${client.guilds.size}__**
**Users**👥 **__${client.users.size}__**
**Channels**📚 **__${client.channels.size}__** `)
               message.channel.sendEmbed(embed);
           }
});


 client.on('message', message => {
                                if(!message.channel.guild) return;
                        if (message.content.startsWith('$ping')) {
                            if(!message.channel.guild) return;
                            var msg = `${Date.now() - message.createdTimestamp}`
                            var api = `${Math.round(client.ping)}`
                            if (message.author.bot) return;
                        let embed = new Discord.RichEmbed()
                        .setAuthor(message.author.username,message.author.avatarURL)
                        .setColor('RANDOM')
                        .addField('**Time Taken:**',msg + " ms :signal_strength: ")
                        .addField('**WebSocket:**',api + " ms :signal_strength: ")
         message.channel.send({embed:embed});
                        }
                    });
					
var prefix = "$"					
client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "own") {


 message.author.sendMessage(`
 
 __~~Bot Staff~~__
 
***KO,System***
 __Powered By__: !Ogami#0571
https://discordapp.com/oauth2/authorize?client_id=526465331997442048&scope=bot&permissions=8
`);

message.channel.send('**تم الارسال في الخاص**');

    }
});	



client.login(process.env.BOT_TOKEN);
