// tempban.js
const parseDuration = require('parse-duration'),
    humanizeDuration = require('humanize-duration')
    
module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('T\'est débile ?')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Mentionne celui que tu veux que je tue.')
        if (member.id === message.guild.ownerID) return message.channel.send('Tu cherche la baguarre ?!')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Respecte tes supérieurs !')
        if (!member.bannable) return message.channel.send('Il est trop fort pour moi ;-;')
        const duration = parseDuration(args[1])
        if (!duration) return message.channel.send('Combien de temps dois-je le bannir ?')
        const reason = args.slice(2).join(' ') || 'Raison : inconnue'
        await member.ban({reason})
        message.channel.send(`**${member.user.tag} **a été supprimé(e) du serveur par 「ZA HANDO」 pendant ${humanizeDuration(duration, {language: 'fr'})} !
        https://media.discordapp.net/attachments/764611493375246361/784941839274868736/1505580655_za_hando.gif`)
        setTimeout(() => {
            message.guild.members.unban(member)
            message.channel.send(`**${member.user.tag}** peut revenir dans le serveur !`)
        }, duration)
    },
    name: 'tempban',
    guildOnly: true
}