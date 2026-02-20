/**
 * DATA CONFIGURATION
 * Anda bisa mengisi data secara manual di variabel 'manualData' 
 * atau menghubungkan dengan Google Sheets.
 */

const CONFIG = {
    // Ganti dengan URL Google Sheets CSV Anda jika ingin auto-sync
    // Cara: File > Share > Publish to web > Format: CSV
    googleSheetUrl: "", 
    useGoogleSheet: false // Set ke true jika ingin pakai Google Sheets
};

const manualData = [
    {
        id: 1,
        name: "Aria Silverlight",
        nickname: "The Radiant Blade",
        rarity: "S",
        tags: ["Warrior", "Light", "Human"],
        mainImage: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?auto=format&fit=crop&w=800&q=80",
        story: "Aria adalah ksatria suci yang bersumpah untuk melindungi kerajaan dari kegelapan abadi. Pedangnya terbuat dari pecahan bintang yang jatuh.",
        extraImages: [
            "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80"
        ]
    },
    {
        id: 2,
        name: "Kaelen Shadowstep",
        nickname: "Night Walker",
        rarity: "A",
        tags: ["Assassin", "Dark", "Elf"],
        mainImage: "https://images.unsplash.com/photo-1560972550-aba3456b5564?auto=format&fit=crop&w=800&q=80",
        story: "Seorang pembunuh bayaran yang bergerak dalam bayang-bayang. Tidak ada yang pernah melihat wajahnya dan bertahan hidup.",
        extraImages: [
            "https://images.unsplash.com/photo-1534423839368-1791a1ad2f11?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80"
        ]
    },
    {
        id: 3,
        name: "Luna Moonwhisper",
        nickname: "Celestial Mage",
        rarity: "S",
        tags: ["Mage", "Magic", "Human"],
        mainImage: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80",
        story: "Luna menguasai sihir bulan yang sangat langka. Dia bisa memanipulasi gravitasi dan cahaya malam.",
        extraImages: [
            "https://images.unsplash.com/photo-1501139083538-0139583c060f?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1464802686167-b939a67e06d1?auto=format&fit=crop&w=400&q=80"
        ]
    },
    {
        id: 4,
        name: "Grimm Ironfist",
        nickname: "Mountain Breaker",
        rarity: "B",
        tags: ["Tank", "Earth", "Dwarf"],
        mainImage: "https://images.unsplash.com/photo-1559156158-9329562369c4?auto=format&fit=crop&w=800&q=80",
        story: "Grimm adalah pemimpin klan kurcaci gunung. Kekuatannya setara dengan sepuluh orang dewasa.",
        extraImages: [
            "https://images.unsplash.com/photo-1519074063912-ad2fe3f51984?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1535666669445-e8c15cd2e7d9?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1506318137071-a8e063b4bcd0?auto=format&fit=crop&w=400&q=80"
        ]
    },
    {
        id: 5,
        name: "Sylph Windrunner",
        nickname: "Storm Archer",
        rarity: "A",
        tags: ["Archer", "Wind", "Elf"],
        mainImage: "https://images.unsplash.com/photo-1500462859194-885860bb1107?auto=format&fit=crop&w=800&q=80",
        story: "Anak panahnya tidak pernah meleset karena dipandu oleh roh angin.",
        extraImages: [
            "https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=400&q=80"
        ]
    },
    {
        id: 6,
        name: "Ignis Flameheart",
        nickname: "Dragon Slayer",
        rarity: "S",
        tags: ["Warrior", "Fire", "Dragonborn"],
        mainImage: "https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&w=800&q=80",
        story: "Mewarisi darah naga api, Ignis mampu membakar seluruh pasukan musuh sendirian.",
        extraImages: [
            "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80"
        ]
    }
];
