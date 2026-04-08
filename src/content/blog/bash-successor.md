---
title: Building a bash successor.
description: I started building OpenHarbor, but it's hard.
pubDate: 2025-04-08
---

i started building openharbor because of a very simple thought: agents use bash, and i want them to use something better than bash.

that still feels true to me. what feels less clear now is what that actually turns into.

so this is me trying to say it plainly, because i think i understand why i started this, but i do not think i fully understand yet how to get from the idea to something people would reaaaaaally want to use.

what set this off for me was seeing the [argument that bash is not enough for agents](https://www.youtube.com/watch?v=TilDSWeiAlw). that clicked immediately, mostly because it matched something i was already feeling. giving a model the whole codebase is bad. letting it search and read what it needs is much better. bash became the default way to do that because it is one interface that can do almost everything. but bash is also kind of a terrible place to put meaning, policy, and approvals. it can do the work, but it is not a very good shape for the work.

with bash, everything becomes "run this string." that is flexible, but it is also a problem. it is hard to know what a command really means before you run it. it is hard to know whether something is read-only, mutating, destructive, or external in a way that the system can reason about cleanly. it is hard to approve intentions instead of syntax. it is hard to make approvals reusable without them becoming sloppy. output is all over the place. and the actual authority boundary is whatever the process can reach, which is usually way more than you want.

none of that means bash is bad. it just means bash is doing a job it was never really meant to do.

that is what made me want to build a different layer. not better prompts, not more random tools, not just a shell wrapper with extra safety rails. i wanted something where the model still gets to do logic, but the authority is shaped differently.

the best short version i have right now is that openharbor is an execution layer for agents where the model can inspect things and prepare work, but real authority goes through typed capabilities, draft state, review, and explicit publish. in that model, the main objects are not commands. they are sessions, drafts, diffs, publish previews, approvals, and a small set of actions with actual meaning.

that still feels right to me.

another way to say it is: bash gave agents reach. what i want is something with more structure than that.

and to be fair, i have built enough now to feel that there is something there. openharbor can already do a narrow code workflow: open a repo session, search the repo, read files, write draft changes into an overlay, diff those changes, run managed test adapters, preview publish, and require approval before changes hit the real repo. that is not just an idea anymore. it is real enough to use and real enough to feel the shape of.

it also already proves a few things to me. draft-first edits are easier to reason about than direct mutation. review objects like diffs and publish previews are much easier to inspect than a random trail of shell commands. session-scoped work feels cleaner than just giving the agent ambient shell access and hoping it behaves. so i do not think the whole thing is fake.

but i also do not think that means it is a product yet.

the hard part is that bash is already very good. ugly, yes. semantically weak, yes. but still very good. if an agent has bash, it can search with `rg`, inspect files, edit directly, run tests, install packages, run scripts, and generally improvise its way through weird situations. that workflow is messy, but it works. so now i keep running into the same question: why would someone use openharbor instead?

there are answers to that. someone might want draft-first changes. they might not want to give an agent raw shell authority. they might want cleaner review before mutation. they might want better boundaries around reads, tests, and publish. they might want something that could eventually extend beyond code into apis or browsers or other systems without every action turning back into command strings.

all of that makes sense to me.

but there is also a very obvious counterpoint. if openharbor is just a slower, narrower, more annoying version of shell, then nobody should use it. and i think that is the part i do not want to talk around. that is a real risk.

i do not think the idea is nonsense. i also do not think the thing i have right now is automatically valuable enough just because the architecture sounds cleaner. those are different claims. i believe raw shell is probably the wrong long-term abstraction for agent authority. but that does not mean a replacement is automatically useful. it has to earn its place by being good enough in practice.

that is where i feel stuck.

the shell is a brutally strong baseline. that is why it won. if i replace it with a bunch of weaker tools, i lose. if i replace it with something too constrained to be useful, i also lose. so openharbor has to be narrower than shell in authority, but not dramatically worse in usefulness. that is a hard place to land.

and i think a lot of this comes down to very boring things. search. navigation. file reads. draft inspection. useful defaults. not flooding context while also not making the agent feel blind. that work matters more than the philosophy, honestly. people will forgive a lot if the workflow is sharp. they will not forgive much if it feels clumsy.

approval is another good example. in theory, approval sounds easy. in practice, it is a mess. if the system asks too often, people stop reading and just hit yes. if it does not ask enough, then the trust model is kind of fake. so the whole thing only works if the approval boundary lines up with something a user actually cares about. approving "publish these repo changes" makes sense. approving random command strings does not. but getting that right without making the workflow annoying is hard.

i also do not want this to turn into another huge pile of tools. one obvious failure mode is that i keep adding more and more things until i recreate the same context and complexity problems in a different shape. then the whole point is gone. but the opposite failure mode is just as real: i keep the surface too small, and then it cannot do enough real work to matter. i do not think i have solved that tension yet.

there is also the question of where this thing should even live. i do not think openharbor should mainly be its own agent ui. i think it should sit under the shells people already use. that feels right to me. but it also makes the path harder, because now the product has to fit inside someone else's workflow instead of defining its own from scratch.

if this thing is real, i think it probably becomes real through one narrow loop: find a bug, prepare a fix, run tests, review the diff, publish explicitly. that is the workflow i keep coming back to. it is concrete enough to evaluate and important enough to matter. if openharbor can make that loop feel almost as effective as bash while being much easier to understand and review, then maybe there is something here. if it cannot, then maybe this stays a good idea that never really becomes necessary.

that is probably the honest test.

not whether openharbor can someday govern every external system or become a universal runtime for all agents. just whether it can beat raw shell on trust without losing too badly on usefulness in one workflow that people actually care about.

i still believe a few things pretty strongly. i do not think models should need raw ambient authority as the main abstraction. i think draft-before-publish is a better default than direct mutation. i think approvals should attach to intent where possible, not just syntax. i think typed capabilities are a better place to put policy than shell strings. and i think this probably needs to show up inside existing agent shells before it becomes anything bigger.

but i also think it is possible to be right about the direction and still fail to make something people want.

that is where i am right now.

i know why i started building this. i do not fully know how to go forward except by making the constrained workflow much better and seeing if it starts to feel actually useful instead of just principled.
