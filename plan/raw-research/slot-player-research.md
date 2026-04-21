# Slot Player Research

Notes I pulled together for personas and user stories. Sources at the bottom.

## Why people play slots

Same handful of motivations comes up across basically every source:

- Excitement and anticipation. Rewards on an unpredictable schedule get people hooked in a way predictable rewards don't. That's the whole psychological engine [2][3].
- Relaxation. A lot of players aren't chasing wins, they're unwinding after work. Theming and ambient sound lean into this [1][2].
- Feeling in control. Players engage more when they get to pick the bet or press spin themselves, even though none of that changes the odds [3].
- Money. In the research, but not the top driver for most players [1].
- Sharing it. Not in the older slot literature at all, but huge in casual web games — people send links, compare wins, screenshot stuff [4][5].

The thing that jumped out to me: motivations are mostly non-financial, even for real-money players [1]. That's good for us. Means a free-to-play game can still hit most of what draws people to slots.

## The four clusters

The main peer-reviewed segmentation of slot players is Chen, Shoemaker & Zemke (2013). They ran a factor-cluster analysis on survey data and got four groups:

1. Utilitarian seekers (functional reasons like boredom)
2. Excitement seekers (biggest group, n=280)
3. Multipurpose seekers (mix of motivations)
4. Relaxation seekers (playing to chill out)

The factors underneath those clusters were ego-driven, learning, relaxation, excitement, and financial rewards [1].

## What's actually in a slot machine

Worth understanding the actual parts because the jargon comes up in every source:

- Reels. The vertical columns that spin. Classic is 3 reels, modern is usually 5.
- Symbols. What shows up on the reels. Can be theme-specific, or the classic fruits/bars/7s.
- Paylines. The patterns that count as a win. One line means only the middle row matters. Multi-line means diagonals, zigzags, all kinds of shapes can pay out. Modern games often have 20+ paylines [10].
- RTP (return to player). The long-run payout percentage. A 96% RTP means that over millions of spins, the machine pays back 96 cents for every dollar in. Regulated in real-money contexts, irrelevant for us but worth knowing the term [2].
- Volatility. How spiky the payouts are. Low volatility = lots of small wins, high volatility = rare big ones.
- Bonus rounds and free spins. Special events triggered by specific symbol combos. These are usually the highlight of a session for engaged players.

## Two mechanics worth knowing (and their ethical baggage)

These are two of the most studied slot design features, and both come with baggage we should think about.

### Near-misses

When the reels land just short of a win — two cherries and a lemon, or two jackpot symbols on the first two reels with the third just off. Skinner originally proposed in the 1950s that near-misses keep players playing. The research on this is genuinely mixed. Some studies found about 30% of near-misses increase gambling behavior [11][12], and a 2024 online slots study found near-misses did increase motivation to keep playing [13]. But a 2019 review with controlled experiments on both pigeons and humans failed to replicate the effect [14]. So: real effect, probably, but overclaimed in pop-psych writing.

For our game: we can design to produce near-misses naturally (they happen anyway on any multi-symbol reel), but we shouldn't rig the RNG to produce extra near-misses. That's the manipulative version.

### Losses disguised as wins (LDWs)

A spin where you bet $2 and win back $0.50, but the machine plays the same flashing lights and triumphant sound as a real win. You actually lost $1.50. These only exist on multi-line games — if you bet on 20 paylines at once, you can hit on one of them and still lose money overall [15]. Research shows people miscategorize these as wins and overestimate how often they won during a session, with a "sweet spot" around 15-25% LDW rate where the illusion works best [16].

For our game: this is the most manipulative slot design feature in the literature. If we do multi-line, we should either avoid LDWs entirely, or at least not dress them up as wins. The UK actually banned celebratory audio on LDWs in 2021 [15].

## Light flow vs. dark flow

Worth flagging because it shapes how we should design. Dixon et al. (2019) found two routes to enjoying slot play [6][7]:

- Light route: you like the wins themselves. Not correlated with problem gambling.
- Dark route ("dark flow"): you like the trance-like absorbed state players call the "machine zone." Strongly correlated with problem gambling and depression.

We should design for the light route. That means short sessions that end well, not an endless time-on-device loop.

## Casual and mobile context

Bartle's old player types (Achievers, Explorers, Socializers, Killers) [8] still show up in game design writing, but Bartle himself has warned against applying it to casual games [9]. More useful for us is iGaming behavioral segmentation, which names things like Slot Enthusiasts (bonus-round chasers), Game Hoppers (novelty seekers), and Marathon Players [4]. One thing that surprised me: Socializers apparently dominate casual gaming [5]. Which means shareability probably matters more than you'd think.

## Takeaways for our project

A few things I think we should just commit to based on all this:

1. No real money, no fake currency that pretends to be money. Credits only.
2. Design for short satisfying sessions, not time-on-device.
3. If we do multi-line, no LDWs dressed up as wins.
4. Theme matters a lot. Pick one and commit.
5. Some kind of bonus event or special feature — that's what engaged players come back for.
6. Make wins shareable. The research on casual gaming says social layer dominates.
7. Mute toggle is non-negotiable. Sound design matters but context varies.

## Sources

[1] Chen, Shoemaker & Zemke (2013), "Segmenting slot machine players: A factor-cluster analysis." _IJCHM_ 25(1), 23–48. https://doi.org/10.1108/09596111311290200
[2] Schüll (2012), _Addiction by Design_. Princeton UP. Summary: https://www.readtrung.com/p/the-ludicrous-psychology-of-slot
[3] Exposed Magazine, "The Psychology of Slot Machines." https://www.exposedmagazine.co.uk/featured-articles/why-do-people-play-slot-machines-the-psychology-of-slot-machines/
[4] Smartico.ai, "Online Casino Player Segmentation." https://www.smartico.ai/blog-post/casino-player-segmentation-the-ultimate-guide-to-personalized-marketing
[5] GameAnalytics, "Bartle Player Taxonomy." https://www.gameanalytics.com/blog/understanding-your-audience-bartle-player-taxonomy
[6] Dixon et al. (2019), "Mindfulness Problems and Depression Symptoms... Dark Flow." _Psychology of Addictive Behaviors_ 33(1), 81–90.
[7] Dixon et al. (2019), "Reward reactivity and dark flow... Light and dark routes." _J. Behavioral Addictions_ 8(3), 489–498. https://pubmed.ncbi.nlm.nih.gov/31460768/
[8] Bartle (1996), "Hearts, Clubs, Diamonds, Spades." http://mud.co.uk/richard/hcds.htm
[9] Wikipedia, Bartle taxonomy. https://en.wikipedia.org/wiki/Bartle_taxonomy_of_player_types
[10] Harrigan et al. (2014), "Modern Multi-line Slot Machine Games." _J. Gambling Studies_. https://link.springer.com/article/10.1007/s10899-013-9436-z
[11] Wikipedia, "Near-miss effect." https://en.wikipedia.org/wiki/Near-miss_effect
[12] Clark et al., work cited in near-miss effect review.
[13] Stange et al. (2024), "The near-miss effect in online slot machine gambling." https://pubmed.ncbi.nlm.nih.gov/38709628/
[14] Pisklak, Yong & Spetch (2019), "The Near-Miss Effect in Slot Machines: A Review and Experimental Analysis." https://pubmed.ncbi.nlm.nih.gov/31522339/
[15] Dixon et al. (2010), "Losses disguised as wins in modern multi-line video slot machines." _Addiction_ 105, 1819–1824. https://uwaterloo.ca/reasoning-decision-making-lab/sites/default/files/uploads/files/DixFugetal_10c.pdf
[16] Graydon et al. (2020), "Do losses disguised as wins create a sweet spot for win overestimates." https://www.sciencedirect.com/science/article/abs/pii/S0306460320307280
