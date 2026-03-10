// locations.js    

function loadImages() {
    // TODO remove
    image_PLACEHOLDER = loadImage('assets/img/Z_placeholder.png');
    
    // images
    image_elevator = loadImage('assets/img/GLOBAL_elevator.png');

    // -1F
    image_minus1F_service_stairs = loadImage('assets/img/image_minus1F_service_stairs.png');
    image_minus1F_parking = loadImage('assets/img/image_minus1F_parking.png');
    image_minus1F_security_office = loadImage('assets/img/image_minus1F_security_office.png');
    image_minus1F_entrance = loadImage('assets/img/image_minus1F_entrance.png');
    image_minus1F_car_sport = loadImage('assets/img/image_minus1F_car_sport.png');
    image_minus1F_car_4x4 = loadImage('assets/img/image_minus1F_car_4x4.png');
    image_minus1F_exit_win = loadImage('assets/img/image_minus1F_exit_win.png');
   
    


    // 0F
    image_0F_entrance = loadImage('assets/img/0F_entrance.png');
    image_0F_storage = loadImage('assets/img/0F_storage.png');
    image_0F_clothes_shop = loadImage('assets/img/0F_clothes_store.png');
    image_0F_restaurant = loadImage('assets/img/0F_restaurant.png');
    image_0F_bubble_tea = loadImage('assets/img/0F_bubble_tea.png');
    image_0F_stairs = loadImage('assets/img/0F_stairs.png');
    image_0F_service_stairs = loadImage('assets/img/0F_service_stairs.png');
    image_0F_living_space = image_PLACEHOLDER
    image_0F_food_court = loadImage('assets/img/0F_food_court.png');
    image_0F_corridor = loadImage('assets/img/0F_corridor.png');

    // 1F
    
    image_1F_pharmacy = loadImage('assets/img/1F_pharmacy.png');
    image_1F_bathroom = loadImage('assets/img/1F_bathroom.png');
    image_1F_lounge = loadImage('assets/img/1F_lounge.png');
    image_1F_stairs = image_PLACEHOLDER
    image_1F_korean_store = loadImage('assets/img/1F_korean_store.png');
    image_1F_gun_store = loadImage('assets/img/1F_gun_store.png');
    image_1F_hidden_storage = loadImage('assets/img/1F_hidden_storage.png');
    image_1F_food_market = loadImage('assets/img/1F_food_market.png');
    image_1F_service_stairs = loadImage('assets/img/1F_service_stairs.png');

    // 2F
    image_2F_service_stairs = loadImage('assets/img/2F_service_stairs.png');
    image_2F_rooftop = loadImage('assets/img/2F_rooftop.png');
    image_2F_tent = loadImage('assets/img/2F_tent.png');
    image_2F_exit = loadImage('assets/img/2F_exit.png');
    image_2F_exit_win = loadImage('assets/img/2F_exit_win.png');
  
}


function initialiseLocations() {


  

    // locations -1F 


    game.locations.location_minus1F_elevator = new Place(
    "Elevator -1F",
    "The elevator doors at this level have been pried open and wedged in place with a length of pipe that has since rusted into position. The shaft beyond them drops down into darkness below and climbs upward toward the floors above. The elevator cabin is somewhere up there — you can hear the faint creak of its cables when the air moves. Someone has been in this shaft before: crude footholds have been hammered into the concrete wall at regular intervals, and scorch marks near the base suggest a light source was used down here for a long time. The smell of rust and enclosed air rolls out of the opening. It's a climbable route to the ground floor if you're willing, or you can head back into the sprawl of the parking area. What's certain is that this shaft connects the floors — it's a route, even without the cabin.",
    "-1F",
    image_elevator)

    game.locations.location_minus1F_service_stairs = new Place(
    "Service stairs -1F",
    "A narrow stairwell sits behind a door marked with faded yellow safety tape, the kind of tape that has lost its adhesion on one side and hangs in a drooping flag across the frame. The door itself is heavy steel, hinged to swing outward, and the handle has been wrapped in grip tape by someone who used it often. Inside, the stairwell is plain — bare concrete walls, exposed conduit running up one side, a metal handrail bolted directly into the wall. The steps are solid underfoot, without the bounce or creak of the public stairways. This was built for function, not comfort. It connects up to the ground floor service corridor and down to the parking area below. On the wall, stencilled in block letters: AUTHORISED PERSONNEL ONLY. The letters are old and half-peeled, and whatever authority backed them is long gone",
    "-1F",
    image_minus1F_service_stairs)

    game.locations.location_minus1F_parking = new Place(
    "Parking area",
    "A vast underground car park stretches out before you, the kind of space that was built to hold hundreds of vehicles but now feels like an abandoned cathedral. Most bays are empty, their painted lines fading into the grey concrete, each one a ghost of a car long since driven away. Oil stains spread across the floor in dark archipelagos, and the smell of old exhaust and damp stone hangs heavy in the recycled air. Concrete pillars march off in orderly rows under a ceiling fitted with strip lights, most of them dead, a few still flickering with a low, inconsistent hum that pulses every few seconds like a slow heartbeat. A dented security office sits in one corner, its reinforced glass window dark. Nearby, two cars remain — a battered sport car and a rugged 4x4 — both parked near the far wall as though their owners planned to return. The garage door leading outside is visible at the far end, a wall of corrugated metal separating this dead space from whatever waits beyond. On the wall near the parking entrance, a mounted panel catches your eye: it controls the building's elevator system. The casing is cracked, but the wiring behind it still looks intact. The right card might bring this whole thing back online.",
    "-1F",
    image_minus1F_parking)

    game.locations.location_minus1F_security_office = new Place(
    "Security Office",
    "A cramped room sits behind reinforced glass, the kind designed to make whoever's inside feel safer than they probably were. The monitors have been dead for a long time — their screens dull and coated in a thin film of dust that records every breath of air that has passed through here. A swivel chair lies tipped over beside the desk, one wheel still spinning faintly when disturbed, as though the person who knocked it over has only just left. Papers are scattered across the metal desk and the floor around it: shift rosters, incident logs, a half-completed crossword. Someone left in a real hurry. A coffee mug sits upright on the corner of the desk, its contents evaporated down to a dark ring of residue. The room smells of stale air and old electronics. A small shelf above the desk holds a defunct radio and a ring of spare keys to rooms that likely no longer matter. On the floor near the desk, half tucked under the bottom shelf as though it rolled or was kicked there during the exit rush, sits a gun magazine — full, heavy, and easy to miss if you weren't looking carefully. You were.",
    "-1F",
    image_minus1F_security_office)

    game.locations.location_minus1F_entrance = new Place(
    "Garage door",
    "Garage door leading to the outside world MISSING",
    "-1F",
    image_minus1F_entrance)

    game.locations.location_minus1F_car_sport = new Place(
    "Sport car",
    "A once-sleek sports car sits alone in its bay, the kind of vehicle that probably turned heads when it was new. Now the windows are smashed in on both sides, the glass spread across the seats and the concrete floor in a glittering mess that crunches under your feet even from a distance. The paint — some shade of deep red that the dust has almost entirely buried — is scratched along both flanks, and the driver's door hangs open at an odd angle, its hinge bent from force rather than age. The interior has been ransacked: the glove compartment hangs open and empty, the seat lining has been cut, and the centre console is ripped out entirely. Whatever was valuable has been taken. But the ransacking was hurried, and hurried people miss things. Wedged down beside the driver's seat, half hidden by the torn upholstery, is a rusty key — small, unremarkable, and intact. In the boot, pushed to the back as though stowed deliberately, sits a locked gasoline tank, its cap sealed so tightly that no amount of hand strength will open it. It's heavy — clearly full — and that makes it worth finding the right tool to crack it open.",
    "-1F",
    image_minus1F_car_sport)

    game.locations.location_minus1F_car_4x4 = new Place(
    "4x4 car",
    "A stocky off-road vehicle occupies a wide bay near the back of the parking level, its bulk somehow reassuring compared to the stripped-out wreckage of the car nearby. The bodywork is dented and scratched — road damage, not vandalism — and a thick coat of dried mud still clings to the wheel arches from some journey it made before all of this. The windows are intact. The tyres look like they have air in them. The keys are sitting in the ignition, dangling from a plain ring with no fob, as if the driver stepped out for just a moment. You check the dashboard: the fuel gauge needle sits well below empty. The engine won't turn over without something in the tank. A canister port near the fuel cap accepts a standard nozzle, and the filler neck is unobstructed. Get some fuel in here and this thing might just be your way out — not an elegant exit, but a functional one. Whatever is beyond that garage door, this car is built to handle it.",
    "-1F",
    image_minus1F_car_4x4)

    // 0F locations


    // location Ground Entrance 
    game.locations.location_0F_entrance_ground = new Place(
    "Ground Entrance",
    "A narrow maintenance shed sits tucked just off the ground entrance, wedged between the outer wall of the mall and the loading bay that was once used for stock deliveries. The space is cramped and close, with metal shelving lining both long walls and cardboard boxes collapsed from years of moisture and neglect, their contents long since turned to mulch. The smell is immediate and thick — rust and damp concrete and something organically wrong underneath it all. A single utility light is mounted to the ceiling on a rusted bracket, its bulb flickering in an uneven rhythm that throws the far corners of the shed in and out of shadow. Old cleaning equipment lines the back wall: mop heads, squeegees, a broken floor polisher with its cord knotted around its own body. Metal carts with seized wheels sit in a row, going nowhere. Footprints in the dust suggest someone has been here recently — more than once, by the look of it. On the floor near a tipped crate, half-buried under a torn plastic sheet, lies a heavy crowbar. It's scratched and worn along the shaft but solid at both ends, the kind of tool that has seen real use and has more left to give.",
    "0F",
    image_0F_entrance) 

    // location Entrance Shed
    game.locations.location_0F_storage_shed = new Place(
    "Storage Shed",
    "sotrage shed that houses different boxes and the crowbar on the floor MISSING",
    "0F",
    image_0F_storage) 

    // location Clothes Store
    game.locations.location_0F_clothes_store = new Place(
    "Clothes Store",
    "You step into a clothes store that once occupied a prime corner of the ground floor, its broad shopfront now reduced to a bent shutter and dusty glass. Rows of empty clothing racks stretch across the floor in the formation they were left in, most of them stripped bare but a few still carrying single, abandoned garments — a coat on a wire hanger, a shirt still folded on a shelf above the fitting rooms. The lights are completely off, but dim daylight seeps in from the ground entrance nearby, bouncing off dusty floor-length mirrors that line the walls and giving the whole space a flat, washed-out quality. Torn price tags drift across the shelves, and piles of discarded hangers crunch underfoot like dead leaves. The air is stale, tinged with the faint chemical smell of old fabric and something softer beneath it — mildew, or just age. Changing rooms line the back wall, their curtains half torn and their doors slightly open, each one revealing a rectangle of deeper shadow. The corridor that links this store to the rest of the mall is blocked by a reinforced internal door — it's heavy, and the hinges are stiff, but a good crowbar worked into the frame should be enough to force it.",
    "0F",
    image_0F_clothes_shop) 

    // location 0F corridor
    game.locations.location_0F_corridor = new Place(
    "Small Corridor",
    "A functional connecting passage runs between the food court and the outer stores of the ground floor, its walls bare plaster and its floor worn smooth by years of foot traffic that has long since stopped. Strip lighting overhead — currently dead — leaves the corridor lit only by what bleeds through from either end. It's longer than it looks from the entrance, with a slight bend in the middle that hides one end from the other. The food court opens out on one side, its wider space visible past a pair of push-bar doors. On the other end, a narrow fishing store has been converted into makeshift living quarters — you can smell it before you see it: old food, dried sweat, the waxy scent of candles burned down to nothing. Set into the corridor wall partway along is a heavy service door fitted with a mechanical lock. It looks like the kind of lock that takes a metal key, the old-fashioned kind, the kind that fits a door that was meant to last. Get it open and the building's service shaft network becomes available — stairs that go where the public ones don't.",
    "0F",
    image_0F_corridor) 

    // location food court
    game.locations.location_0F_food_court = new Place(
    "Food court",
    "A wide atrium opens up at the heart of the ground floor, designed to hold hundreds of people at once and now holding none. Shuttered fast-food counters line the perimeter, their rolling shutters pulled down and padlocked, their overhead menu boards still lit in a few places by emergency power — dead logos and illegible offers glowing faintly in the middle distance. Tables and chairs are overturned across the floor, some of them pushed into rough barricades along one wall, as though someone once thought it mattered where exactly things were stacked. Natural light pushes in through a pair of broken skylights above, rain stains spreading out across the floor beneath them in wide rings. Food wrappers and paper cups have drifted into corners and under the counters, and somewhere behind the nearest counter something has been leaking for a very long time — the tiles in front of it are warped and soft. Hallways branch off toward a Greek restaurant on one side and a bubble tea store on the other. Stairs at the far end climb to the first floor. Mounted to a support pillar in the centre of the atrium is a control panel for the building's elevator system, partially obscured by years of grime. A keycard reader is built into its face — the right card would unlock elevator access across all floors.",
    "0F",
    image_0F_food_court ) 

    // location living space
    game.locations.location_0F_living_space = new Place(
    "Fishing Store",
    "A small shop that once sold fishing supplies — rods still hang on one wall, their lines cut and missing, hooks scattered across the floor like dropped punctuation. Someone turned this space into a hiding place. A sleeping bag is rolled into the corner near the back shelving unit, compressed flat and stained as though it was used for a long time before being discarded. Empty tins line a low shelf, their labels peeled and their lids bent open. A broken camp lantern sits beside the sleeping bag, its glass cracked and its fuel long spent. There's a quality to the arrangement that speaks of care — this wasn't a desperate squat but a deliberate setup, the kind of place someone planned to stay in. They didn't stay forever. In the back of the store, a heavy service door is fitted with a mechanical lock. It connects to the building's service stairwell — the kind of route that doesn't appear on the maps they gave to shoppers. The lock looks designed for a metal key, old-fashioned and stubborn, but functional. The corridor outside is the only other way in or out.",
    "0F",
    image_0F_living_space ) 

    // location elevator 0F
    game.locations.location_0F_elevator = new Place(
    "Elevator 0F",
    "The elevator doors at ground level are wedged open with a length of pipe jammed horizontally across the frame, the metal deformed slightly under the strain of holding them for what must have been months or years. Beyond the doors, the shaft drops into darkness below and climbs upward through the building above. The elevator cabin is not here — it's up there somewhere, stationary, the cables hanging straight and still from the ceiling of the shaft in a way that suggests the brakes have locked. There are rungs bolted to the shaft wall at intervals, crudely added after the fact, suggesting someone used this as a climb route before the idea of an operational elevator became irrelevant. The shaft connects to the level below — underground parking — and to the floors above. The food court is accessible directly from this level. The smell from the shaft is cold and metallic, the kind that comes from enclosed dark spaces that haven't circulated air in a long time.",
    "0F",
    image_elevator)

    game.locations.location_0F_restaurant = new Place(
    "Greek Fast Food restaurant",
    "A fast-food counter runs the length of the back wall, its service hatches still open, its overhead menu board still showing laminated photographs of food that no longer exists anywhere in this building. The smell in here is complex and unpleasant — old grease baked into the walls, something gone wrong in the kitchen, and the sour sweetness of spilled drinks dried to a sticky film across the floor tiles. Stacked trays sit in a pile behind the counter, coated in the same grey dust that covers everything else. In the kitchen behind the hatch, you can see an overturned prep table and what looks like a fryer dragged out of position, its cable still trailing to a dead wall socket. Flies circle something in the back. Near the front counter, partly obscured by a fallen standing sign advertising a combo deal, a keycard lies flat on the tiles. It's a building worker's pass — plastic, chipped along one edge, but the magnetic strip looks intact. Nearby, wedged between the base of the counter and the wall, sits a locked gasoline tank. It's heavier than it looks. The cap is sealed solid — whoever last touched it made sure it wasn't coming off by hand.",
    "0F",
    image_0F_restaurant )

    game.locations.location_0F_bubble_tea = new Place(
    "Bubble Tea Store",
    "An airy corner kiosk, pastel-coloured and designed to feel cheerful, now completely gutted. The countertop dispensing machines have been smashed open, their internal mechanisms pulled out and left in a pile on the floor behind the counter, presumably by someone looking for parts or just looking to destroy something. Coloured syrup has dried on the counter surface in thick brown and purple streaks that run down the cabinet fronts and pool in the joins between the floor tiles. Hundreds of empty plastic cups crunch underfoot in every direction — they must have been knocked from a storage shelf at some point and never cleaned up. The branding on the walls — cheerful cartoon characters holding oversized drinks — has faded but not disappeared, the colour leaching slowly from the printed panels. There is nothing useful here. The store is a dead end, its only value being that it connects back to the food court and provides a brief detour from the weight of everything else. Sometimes a dead end is worth checking. This time, it isn't.",
    "0F",
    image_0F_bubble_tea )

    game.locations.location_0F_stairs = new Place(
    "Stairway going up",
    "A wide public staircase rises from the food court level toward the first floor above, its treads broad and shallow in the way that public-facing stairs always are — designed to carry crowds moving slowly with shopping bags, not people moving fast. The handrails are still solid, bolted through the wall on both sides without any significant play when you grip them. The steps themselves are mostly clear of debris, a few stray objects pushed to the edges by whoever came through here last. Faded arrows point upward on the wall above each landing, still directing shoppers to departments that no longer exist. The stairwell is enclosed on both sides by tiled walls, the acoustic effect making every footstep louder than it should be. Light filters down from a half-open fire door at the top. Below, the food court spreads out and the ways back to the rest of the ground floor are visible through the push-bar doors. It's a straightforward route — not hidden, not locked, just there, waiting to be used.",
    "0F",
    image_0F_stairs ) 

    game.locations.location_0F_service_stairs = new Place(
    "Service stairs 0F",
    "A staff-only stairwell hides behind a door that doesn't announce itself — no signage visible from the main floor, just a grey fire door flush with the wall of the living space. Inside, the stairwell is purely functional: bare concrete walls, a single exposed conduit running vertically beside the stairs, light from a wire-caged bulb at each landing that somehow still works on whatever emergency circuit it was wired to. The air in here is still and cold in a way the rest of the building isn't, as if the shaft has been sealed for long enough to develop its own climate. The smell is damp and mineral. The route runs between three points: the living space conversion on the ground floor, the service level below connecting to the underground parking, and the first floor service corridor above. A door at each landing requires you to push hard — the frames have settled over time and nothing here fits properly anymore. This stairwell doesn't appear on the maps they gave to shoppers. That is precisely why it matters.",
    "0F",
    image_0F_service_stairs)

    // 1F locations
    game.locations.location_1F_elevator = new Place(
    "Elevator 1F",
    "A broad open hallway runs along the spine of the first floor, designed to give shoppers room to breathe between stores. Padded chairs and low tables are pushed against both walls, most of them undisturbed, as though the floor's residents cleared the centre of the space deliberately for some purpose that is no longer obvious. The upholstery on the chairs has faded and some has split, the foam inside spilling out in yellowish handfuls. Tall potted plants stand at intervals along the hall, their dried stalks still held upright by the soil in their tubs, their leaves long since crumbled to dust on the floor around the bases. Weak light comes down from skylights that are intact but coated with grime, the daylight arriving thin and grey. The lounge branches off in several directions — the pharmacy and bathrooms are reachable from here, as are the Korean snack store and the food supermarket. Stairs at one end lead back down to the ground floor. There is also an elevator door set into one wall, sealed with a panel-mounted lock. The keycard reader beside it is dormant but functional. The right access card would unlock the elevator at every floor in the building simultaneously.",
    "1F",
    image_elevator)


    game.locations.location_1F_pharmacy = new Place(
    "Pharmacy",
    "Shelving units line three walls of this store from floor to ceiling, built to hold a dense inventory of boxed medication and health products. Most of the boxes are gone — pulled down and taken or simply knocked to the floor and left in piles that have since been kicked into corners. A few products remain on the higher shelves where nobody bothered to climb, their packaging swollen from humidity and their labels illegible. The glass dispensing counter at the back is shattered, its display case swept clean, whatever was inside long since removed. Behind the counter, the dispensing area has been gone through thoroughly — drawer units pulled open, their contents scattered, a pill counter knocked off a shelf and lying face-down on the floor. On the floor near the rear dispensing area, two items stand out against the debris: a leg stabiliser, the rigid medical kind with adjustable straps designed to hold a fractured or injured leg in alignment, and an empty pistol, old-model, the barrel scratched but the mechanism visibly intact. Neither of these belongs in a pharmacy, which means they were brought here and left here. The lounge is the only way out.",
    "1F",
    image_1F_pharmacy)

    game.locations.location_1F_bathroom = new Place(
    "Bathroom",
    "The first floor bathrooms are the cleanest space in the building, and that's a low bar to clear, but it's noticeable. The tiled floor is intact — no warping, no subsidence, no water damage beyond a thin discolouration near the drain channels. The mirrors above the sink basin are unbroken, and whatever they're reflecting right now looks exactly as bad as you feel. The sinks are dry — the water stopped running a long time ago, and the taps turn without producing anything. Soap dispensers are empty. Paper dispensers are empty. Hand dryers are dead. The cubicles are intact, their doors lockable, their walls scrawled with the usual variety of messages that accumulate in tiled rooms over time — some banal, some philosophical, a few legible as recent additions written in a different medium from the older ones. There is nothing useful here. The bathrooms connect back to the lounge and nowhere else. But they are clean, and they are quiet, and sometimes those two things are worth more than the alternatives.",
    "1F",
    image_1F_bathroom)

    game.locations.location_1F_lounge = new Place(
    "Lounge",
    "Big empty hallway with ample space and relaxing chairs connecting multiple stores",
    "1F",
    image_1F_lounge)

    game.locations.location_1F_stairs = new Place(
    "Stairway going down",
    "Musty stairs going down one floor",
    "1F",
    image_0F_stairs)

    game.locations.location_1F_korean_store = new Place(
    "Korean snack store",
    "Shelves of bright, busy packaging line every wall, the colours still vivid in a building that has grown steadily greyer everywhere else — foil chip bags, boxed snacks, dried seaweed in stacked cellophane envelopes. Most of it is expired and has bloated slightly from internal gas, the packaging distended in a way that looks wrong. The smell of stale seaweed and old sweetness drifts through the space, not unpleasant but definitely off. The floor near the central display is sticky underfoot from a spill that was never cleaned up, the substance having gone through several chemical stages since it was fresh. Near the back of the store, on a shelf that's been only partially disturbed, a small pack of matchsticks sits propped against a box of defunct instant noodles. Thirty-two matches, the packaging says. Most of them should still work. The store connects through a short passage to the gun store next door and opens out the other way into the lounge. Built into the wall near the entrance is a shaft lock mechanism — the kind that takes a metal key — connected to the building's service access system. It looks like it's been tried before: scratches around the keyhole, faint drag marks on the plate.",
    "1F",
    image_1F_korean_store)

    game.locations.location_1F_gun_store = new Place(
    "Gun store",
    "THERE IS A GUN HERE - LOOK AT THE GAME LOGIC",
    "1F",
    image_1F_gun_store)

    game.locations.location_1F_hidden_storage = new Place(
    "Hidden storage room",
    "A small room sits behind a section of panelling in the service corridor that doesn't quite match the rest — a slightly different shade, slightly newer screws. It takes a deliberate look to find it. Inside: bare shelving brackets bolted to the walls, a few cardboard boxes crushed flat in one corner, and the remains of an emergency supply cache that was looted some time ago — torn-open packaging, empty water containers, a first aid kit stripped down to its plastic shell. But on the floor, coiled carefully and tied with a length of its own loose end, is a thick rope. Long, heavy, the kind wound from multiple braided strands and designed to take real load without fraying. Someone put it here. Someone thought it might be needed. It connects to the first floor service stairs and nowhere else — the hidden panel is the only entrance.",
    "1F",
    image_1F_hidden_storage)

    game.locations.location_1F_food_market = new Place(
    "Food supermarket",
    "Despite the appocalypse there's still some products on the shelves",
    "1F",
    image_1F_food_market)

    game.locations.location_1F_service_stairs = new Place(
    "Service stairs 1F",
    "The first floor section of the building's service stairwell continues the same aesthetic as below — concrete, conduit, wire-caged bulbs — but feels more used. Scuff marks on the walls at shoulder height suggest repeated passage. The handrail here has been gripped so many times that the paint is completely worn from the top surface, leaving bare metal that has gone slightly orange with shallow oxidation. The stairs run between three points: the hidden storage room, tucked behind a disguised panel just off the corridor; the floor below, continuing down to the ground level and the underground parking; and the stairs above, which climb toward the second floor service areas. A door at the Korean snack store level opens directly into that store, which is how the hidden room stays hidden — you'd have to know it was there to find it from the main corridor. The stairwell smells of cold concrete and effort.",
    "1F",
    image_1F_service_stairs)




    // 2F locations

    game.locations.location_2F_service_stairs = new Place(
    "Service stairs 2F",
    "The service stairwell emerges at the top of the building into a short landing that ends at a heavy reinforced door. This door is the problem. It's not locked in the conventional sense — the locking mechanism has failed or been damaged, jamming the door shut from the frame side in a way that keys and handles can't resolve. The frame itself has deformed slightly, perhaps from heat, the metal bowed just enough to press the door into its housing with too much force to push through. Something explosive, applied at the right point, would force the frame apart and let the door swing. A makeshift bomb — gasoline and a fuse — would do it cleanly. An armed pistol, fired at the locking point, might do it less cleanly. Either way, the rooftop is on the other side of that door, and this stairwell is the only route up to it. The stairs below connect back to the first floor service stairs. The landing is bare: concrete floor, no windows, a single dead bulb in a wire cage above the door.",
    "2F",
    image_2F_service_stairs)

    game.locations.location_2F_rooftop = new Place(
    "Rooftop",
    "You push through into open air and it hits you immediately — the first genuine outside you've experienced since entering the building. The roof is wide and flat, bordered by a low parapet wall with a rusted metal railing bolted along its top edge. The sky above is grey, or blue, or somewhere between the two, and the wind up here carries the smell of the city — exhaust, wet asphalt, something burning in the middle distance. It feels enormous after the corridors below. The roof surface is covered in the standard layered membrane of commercial flat roofing, cracked and blistered in places, with the joints between sections raised in low ridges that cross the space in parallel lines. Heat exchanger units and ventilation boxes are spaced across the roof in a grid, most of them dead and rusting, their casings pitted by weather. In the far corner, visible from the service stair entrance, a lone camping tent stands pitched between two ventilation boxes, its guy ropes tight and its entrance zipped shut. A short walk the other way leads to the edge of the roof and the railing overlooking the drop below. The service stairs are the only way back down — and currently the only way up.",
    "2F",
    image_2F_rooftop)

    game.locations.location_2F_tent = new Place(
    "Tent",
    "A small camping tent occupies a sheltered corner of the rooftop, positioned deliberately between two ventilation box housings where it would be partially obscured from anyone looking across the roof from the stair entrance. The fabric is a faded olive green, patched in two places with a different-coloured material and taped along one seam with duct tape that has mostly held. The guy ropes are staked into drilled holes in the roof surface — someone was here long enough to bring a drill. The zip is shut. Inside, the tent is inhabited by a corpse — long dead, seated against the back wall with the posture of someone who sat down to rest and didn't get up again. Whatever they had on them has mostly decayed along with them: some items still identifiable by shape, others reduced to ambiguous organic material. The tent smells as you'd expect. Whatever this person knew about survival, or about this building, or about what's happening out there, died with them. The rooftop is just outside through the open end.",
    "2F",
    image_2F_tent)

    game.locations.location_2F_exit = new Place(
    "Edge of the rooftop",
    "The edge of the building is marked by a low parapet wall topped with a metal railing, bolted at intervals and still solid despite the rust that has worked its way into every joint and fitting. Standing here, you can see down — a long way down. The street below is visible: cracked pavement, abandoned vehicles, the debris of the world as it was left. It's survivable with the right equipment. Without it, it isn't. The railing is the right height to loop a rope over and feed it down the exterior wall. The building's facade below this point is textured — windowsills, utility conduit, surface detail enough to manage the descent if the rope holds and you move carefully. If your rope is long enough and secured properly, it becomes a viable exit — not a comfortable one, but a real one. If your brother is with you, he can manage it, slowly. Without him beside you, there's no point going anywhere at all. The rooftop is accessible from here, back through the open expanse of the roof.",
    "2F",
    image_2F_exit)

    game.locations.location_2F_exit_win = new Place(
    "Epilogue",
    "You've made it off the roof together. Your brother somehow managed to get there with you too. You survived another day.",
    "",
    image_2F_exit_win)

    game.locations.location_minus1F_exit_win = new Place(
    "Epilogue",
    "You've made if off in a car together. You managed to survive another day.",
    "",
    image_minus1F_exit_win)


    // connections -1F 
    game.locations.location_minus1F_elevator.connections = [game.locations.location_minus1F_parking, game.locations.location_0F_elevator];

    game.locations.location_minus1F_service_stairs.connections = [game.locations.location_0F_service_stairs, game.locations.location_minus1F_parking];

    game.locations.location_minus1F_parking.connections = [game.locations.location_minus1F_car_sport, game.locations.location_minus1F_car_4x4, game.locations.location_minus1F_security_office, game.locations.location_minus1F_entrance];

    game.locations.location_minus1F_car_sport.connections = [game.locations.location_minus1F_parking];

    game.locations.location_minus1F_car_4x4.connections = [game.locations.location_minus1F_parking];

    game.locations.location_minus1F_security_office.connections = [game.locations.location_minus1F_parking];


    // connections 0F

    game.locations.location_0F_entrance_ground.connections = [game.locations.location_0F_storage_shed, game.locations.location_0F_clothes_store];

    game.locations.location_0F_storage_shed.connections = [game.locations.location_0F_entrance_ground];
    game.locations.location_0F_clothes_store.connections = [game.locations.location_0F_entrance_ground];

    game.locations.location_0F_corridor.connections = [game.locations.location_0F_food_court, game.locations.location_0F_living_space];

    game.locations.location_0F_living_space.connections = [game.locations.location_0F_corridor];

    game.locations.location_0F_food_court.connections = [game.locations.location_0F_corridor, game.locations.location_0F_restaurant, game.locations.location_0F_bubble_tea, game.locations.location_0F_stairs];

    game.locations.location_0F_elevator.connections = [game.locations.location_0F_food_court];

    game.locations.location_0F_restaurant.connections = [game.locations.location_0F_food_court];

    game.locations.location_0F_bubble_tea.connections = [game.locations.location_0F_food_court];

    game.locations.location_0F_stairs.connections = [game.locations.location_1F_stairs, game.locations.location_0F_food_court]

    game.locations.location_0F_service_stairs.connections = [game.locations.location_0F_living_space, game.locations.location_1F_service_stairs, game.locations.location_minus1F_service_stairs]



    // connections 1F

    game.locations.location_1F_elevator.connections = [game.locations.location_0F_elevator, game.locations.location_1F_lounge];

    game.locations.location_1F_lounge.connections = [game.locations.location_1F_pharmacy, game.locations.location_1F_bathroom, game.locations.location_1F_stairs, game.locations.location_1F_korean_store, game.locations.location_1F_food_market];

    game.locations.location_1F_pharmacy.connections = [game.locations.location_1F_lounge];

    game.locations.location_1F_bathroom.connections = [game.locations.location_1F_lounge];

    game.locations.location_1F_korean_store.connections = [game.locations.location_1F_lounge, game.locations.location_1F_gun_store];

    game.locations.location_1F_gun_store.connections = [game.locations.location_1F_korean_store]; 

    game.locations.location_1F_food_market.connections = [game.locations.location_1F_lounge];

    game.locations.location_1F_stairs.connections = [game.locations.location_0F_stairs, game.locations.location_1F_lounge];

    game.locations.location_1F_service_stairs.connections = [game.locations.location_1F_hidden_storage, game.locations.location_0F_service_stairs, game.locations.location_1F_korean_store];

    game.locations.location_1F_hidden_storage.connections = [game.locations.location_1F_service_stairs];


    // connections 2F 
    game.locations.location_2F_service_stairs.connections = [game.locations.location_1F_service_stairs];

    game.locations.location_2F_rooftop.connections = [game.locations.location_2F_service_stairs, game.locations.location_2F_tent, game.locations.location_2F_exit];

    game.locations.location_2F_exit.connections = [game.locations.location_2F_rooftop];

    game.locations.location_2F_tent.connections = [game.locations.location_2F_rooftop];



    // -1F actions
    game.locations.location_minus1F_car_sport.actions = [pickUpKey, pickUpLockedGasolineTank];
    game.locations.location_minus1F_security_office.actions = [pickUpMagazine];


    // -1F item actions
    game.locations.location_minus1F_parking.itemActions = [openElevators];
    game.locations.location_minus1F_car_4x4.itemActions = [fuelCar];



    // 0F actions
    // game.locations.location_0F_entrance_ground.actions = [pickUpKey];
    game.locations.location_0F_storage_shed.actions = [pickUpCrowbar];

    game.locations.location_0F_clothes_store.itemActions = [openClothesDoor];

    game.locations.location_0F_restaurant.actions = [pickUpKeyCard];

    // 0F item actions
    game.locations.location_0F_living_space.itemActions = [openShafts];
    game.locations.location_0F_food_court.itemActions = [openElevators];


    // 1F actions
    game.locations.location_1F_pharmacy.actions = [pickUpLegStabiliser];
    game.locations.location_1F_hidden_storage.actions = [pickUpRope];
    game.locations.location_1F_gun_store.actions = [pickUpPistol];
    game.locations.location_1F_korean_store.actions = [pickUpMatchsticks];
    game.locations.location_1F_food_market.actions = [helpBrother];

    // 1F item actions
    game.locations.location_1F_korean_store.itemActions = [openShafts];
    game.locations.location_1F_food_market.itemActions = [fixBrotherLeg];

    // 2F actions

    // there is none atm

    // 2F item actions

    game.locations.location_2F_service_stairs.itemActions = [open2FDoor, open2FDoorGun];
    game.locations.location_2F_exit.itemActions = [throwRope];


    // todo rope exit

}