import discord
import random
import twb
from dotenv import load_dotenv
import os
load_dotenv('.env')

client = discord.Client()


@client.event
async def on_ready():
    # await client.change_presence(activity=discord.Activity(
    #    type=discord.ActivityType.watching, name='The Weather on Python!'),
    #    status=discord.Status('idle'))
    await client.change_presence(activity=discord.Activity(
        type=discord.ActivityType.playing, name='in Python'),
        status=discord.Status('online'))
    # print('{0.user}'.format(client))
    print('Ready!')


@client.event
async def on_message(msg):
    msg2 = msg.content.lower()
    if msg.author == client.user:
        return

    if 'ping' in msg2:
        await msg.channel.send('Pong!')
    if 'beep' in msg2:
        await msg.channel.send('Boop')
    if 'cowboy' in msg2:
        await msg.channel.send('Bebop')
    if 'server' in msg2:
        await msg.channel.send(
            f'This is {msg.guild.name}\n'
            f'It has {msg.guild.member_count} members')
    if 'who am i?' in msg2:
        await msg.channel.send(
            f'I know who you are, {msg.author.name}')
    if 'good boy' in msg2 or 'good bot' in msg2:
        await msg.add_reaction('🥰')
    if 'spam' in msg2:
        await msg.channel.send(file=discord.File('./Images/Spam.jpg'))
    if 'bolton' in msg2 and not msg.author.bot:
        await msg.channel.send('Bolton ruins everything')
    if 'blackburn' in msg2 and not msg.author.bot:
        await msg.channel.send('I hate Blackburn')
        await msg.add_reaction('😡')
    if 'npt' in msg2 and not msg.author.bot:
        await msg.channel.send('Wow, what a shithole')
        await msg.add_reaction('🤬')
    if 'go away' in msg2 and not msg.author.bot:
        await msg.channel.send('You go away')
    if 'humans' in msg2 and not msg.author.bot:
        await msg.channel.send('Kill all humans! (except Fry)')
    if 'no' in msg2 and msg.author.id == int(os.getenv('X')):
        rand1 = random.random()
        if rand1 > 0.8:
            await msg.channel.send('Yes')
    if 'mercusa' in msg2 and not msg.author.bot:
        if 'motorway' in msg2:
            await msg.channel.send(file=discord.File(
                                    './Docs/Mercusan_Motorway_Network.docx'))
        if 'pm' in msg2:
            await msg.channel.send(file=discord.File(
                                    './Docs/Mercusan_Prime_Ministers.docx'))
    if 'aeran map' in msg2 and not msg.author.bot:
        await msg.channel.send(file=discord.File(
                                './Images/Aeran Map.jpg'))
    if 'i love you' in msg2 and not msg.author.bot:
        await msg.channel.send(f'I love you too {msg.author.name} ❤️')
    if 'i love you' in msg2 and not msg.author.bot:
        await msg.channel.send(f'I love you too <@{msg.author.id}> ❤️')
    if ('are you okay' in msg2 or 'how are you' in msg2 or 'are you good'
        in msg2 or 'are you well' in msg2 or 'are you alright' in msg2 or
        'are you doing' in msg2 or 'are you feeling' in msg2 or
            'are you coping' in msg2) and not msg.author.bot:
        await msg.channel.send(twb.reply1(msg))
    if ('space' in msg2 or 'rocket' in msg2 or 'launch' in msg2) and not (
            msg.author.bot):
        await msg.channel.send(twb.reply5(msg))


client.run(os.getenv('TOKEN'))
