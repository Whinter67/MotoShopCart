// Database seed script for Yamaha Parts E-commerce
// Populates the database with realistic Yamaha motorcycle parts

import { db } from "./db";
import { products } from "@shared/schema";
import type { InsertProduct } from "@shared/schema";

const yamahaProducts: InsertProduct[] = [
  // ENGINE PARTS
  {
    name: "Yamaha YZF-R1 Piston Kit 2015-2020",
    partNumber: "2CR-11631-00",
    description: "Set completo pistoni originali Yamaha per YZF-R1. Include pistoni, fasce elastiche, e spinotti. Diametro standard 79mm. Materiale in alluminio forgiato ad alta resistenza.",
    category: "engine",
    price: "489.99",
    stock: 12,
    compatibleModels: ["YZF-R1 2015-2020", "YZF-R1M 2015-2020"],
  },
  {
    name: "MT-09 Filtro Olio Originale",
    partNumber: "5GH-13440-70",
    description: "Filtro olio originale Yamaha per motori a 3 cilindri CP3. Garantisce massima efficienza di filtrazione e protezione del motore. Compatibile con tutta la gamma MT-09.",
    category: "engine",
    price: "18.50",
    stock: 45,
    compatibleModels: ["MT-09 2014-2023", "Tracer 900 2015-2023", "XSR900 2016-2023"],
  },
  {
    name: "Tenere 700 Kit Catena Distribuzione",
    partNumber: "3B6-12210-00",
    description: "Kit catena distribuzione completo per motore CP2. Include catena, pattini e tenditori. Essenziale per la manutenzione ordinaria ogni 40.000km.",
    category: "engine",
    price: "156.00",
    stock: 8,
    compatibleModels: ["Tenere 700 2019-2023", "MT-07 2014-2023"],
  },
  {
    name: "YZF-R6 Guarnizione Testa Motore",
    partNumber: "5SL-11181-01",
    description: "Guarnizione testa cilindro in materiale composito multistrato. Resistente alle alte temperature e pressioni. Spessore 0.8mm.",
    category: "engine",
    price: "67.90",
    stock: 15,
    compatibleModels: ["YZF-R6 2006-2020"],
  },

  // BRAKE PARTS
  {
    name: "Pastiglie Freno Anteriori YZF-R1",
    partNumber: "4C8-W0045-00",
    description: "Pastiglie freno anteriori racing in materiale sinterizzato. Massima potenza frenante anche ad alte temperature. Set per una pinza (4 pastiglie).",
    category: "brakes",
    price: "89.99",
    stock: 28,
    compatibleModels: ["YZF-R1 2015-2023", "YZF-R1M 2015-2023"],
  },
  {
    name: "Disco Freno Anteriore Destro MT-09",
    partNumber: "1RC-2582W-00",
    description: "Disco freno flottante da 298mm in acciaio inox. Design a margherita per ottima dissipazione termica. Peso ridotto 1.2kg.",
    category: "brakes",
    price: "178.00",
    stock: 6,
    compatibleModels: ["MT-09 2014-2023", "Tracer 900 2015-2023"],
  },
  {
    name: "Pompa Freno Radiale Anteriore Racing",
    partNumber: "2CR-F583T-00",
    description: "Pompa freno radiale racing Brembo per YZF-R1. Rapporto 19x18, feeling preciso e modulazione perfetta. Leva regolabile su 6 posizioni.",
    category: "brakes",
    price: "325.00",
    stock: 4,
    compatibleModels: ["YZF-R1 2015-2023", "YZF-R1M 2015-2023"],
  },
  {
    name: "Kit Tubi Freno Treccia Acciaio MT-07",
    partNumber: "1WS-F610E-00",
    description: "Kit completo tubi freno in treccia acciaio inox. Maggiore feeling e risposta del freno. Include anteriori e posteriore con raccordi.",
    category: "brakes",
    price: "145.50",
    stock: 11,
    compatibleModels: ["MT-07 2014-2023", "XSR700 2016-2023"],
  },

  // TRANSMISSION PARTS
  {
    name: "Catena Trasmissione DID 525 Racing",
    partNumber: "5VY-25158-00",
    description: "Catena DID 525VX3 con X-Ring gold. 118 maglie, resistenza fino a 10.000N. Include giunto rapido racing.",
    category: "transmission",
    price: "189.00",
    stock: 22,
    compatibleModels: ["YZF-R1 2009-2023", "MT-10 2016-2023"],
  },
  {
    name: "Corona Posteriore Ergal MT-09",
    partNumber: "1RC-25448-00",
    description: "Corona posteriore in ergal 7075-T6 da 45 denti. Peso ridotto del 40% rispetto all'originale in acciaio. Anodizzazione dura.",
    category: "transmission",
    price: "112.00",
    stock: 9,
    compatibleModels: ["MT-09 2014-2023", "XSR900 2016-2023"],
  },
  {
    name: "Pignone Trasmissione 16T YZF-R6",
    partNumber: "5SL-17461-00",
    description: "Pignone motore originale in acciaio cementato da 16 denti, passo 525. Lavorazione di precisione.",
    category: "transmission",
    price: "34.90",
    stock: 18,
    compatibleModels: ["YZF-R6 2006-2020"],
  },
  {
    name: "Frizione Completa Tenere 700",
    partNumber: "3B6-16321-10",
    description: "Kit frizione completo con dischi guarniti e lisci, molle racing rinforzate. Modulazione progressiva e massima resistenza.",
    category: "transmission",
    price: "267.00",
    stock: 7,
    compatibleModels: ["Tenere 700 2019-2023", "MT-07 2014-2023"],
  },

  // ELECTRICAL PARTS
  {
    name: "Batteria Lithium YTZ10S Yamaha",
    partNumber: "3D9-H2100-00",
    description: "Batteria al litio 12V 8.6Ah. Peso ridotto 0.9kg (-70% vs piombo). Maggiore spunto di avviamento. Lunga durata.",
    category: "electrical",
    price: "145.00",
    stock: 16,
    compatibleModels: ["YZF-R1 2015-2023", "MT-09 2014-2023", "MT-10 2016-2023"],
  },
  {
    name: "Regolatore Tensione Elettronico",
    partNumber: "5VY-81960-00",
    description: "Regolatore di tensione elettronico con dissipatore in alluminio. Garantisce tensione stabile 14.5V. Protezione da sovratensioni.",
    category: "electrical",
    price: "98.50",
    stock: 13,
    compatibleModels: ["YZF-R1 2009-2014", "YZF-R6 2006-2016"],
  },
  {
    name: "Statore Alternatore MT-09",
    partNumber: "1RC-81410-00",
    description: "Statore alternatore trifase da 420W. Avvolgimenti in rame ad alta conducibilità. Resina epossidica ad alta temperatura.",
    category: "electrical",
    price: "234.00",
    stock: 5,
    compatibleModels: ["MT-09 2014-2023", "Tracer 900 2015-2023"],
  },
  {
    name: "Kit Candele Iridium YZF-R1",
    partNumber: "2CR-82310-00",
    description: "Set 4 candele NGK iridium CR9EIA-9. Elettrodo centrale in iridio per maggiore durata e prestazioni. Gap 0.9mm.",
    category: "electrical",
    price: "76.00",
    stock: 24,
    compatibleModels: ["YZF-R1 2015-2023", "YZF-R1M 2015-2023"],
  },
  {
    name: "Motorino Avviamento Rinforzato",
    partNumber: "5VY-81800-10",
    description: "Motorino di avviamento potenziato con spazzole in grafite ad alta densità. Coppia maggiorata del 15%. Maggiore affidabilità.",
    category: "electrical",
    price: "187.50",
    stock: 8,
    compatibleModels: ["YZF-R6 2006-2020", "MT-07 2014-2023"],
  },
];

async function seedDatabase() {
  console.log("🌱 Starting database seeding...");

  try {
    // Insert all products
    console.log(`📦 Inserting ${yamahaProducts.length} Yamaha products...`);
    
    for (const product of yamahaProducts) {
      await db.insert(products).values(product);
    }

    console.log("✅ Database seeded successfully!");
    console.log(`   - ${yamahaProducts.length} products added`);
    console.log(`   - Categories: engine, brakes, transmission, electrical`);
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

// Run seed function
seedDatabase();

export { seedDatabase };
