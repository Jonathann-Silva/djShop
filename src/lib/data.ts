
'use server';

import { unstable_noStore as noStore } from 'next/cache';
import { db } from './firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import type { Perfume, Eletronico, Bebida, Order } from './products';


// --- Read Functions ---

export async function getProducts(): Promise<Perfume[]> {
  // Removido noStore() daqui para permitir o cache em páginas de listagem.
  try {
    const productsCollection = collection(db, 'products');
    const productsSnapshot = await getDocs(productsCollection);
    const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Perfume));
    return productsList;
  } catch (error) {
    console.error('Falha ao ler produtos do Firestore:', error);
    return [];
  }
}

export async function getProductById(id: string): Promise<Perfume | null> {
    noStore(); // Individual products should not be cached as their price might change.
    try {
        const productRef = doc(db, 'products', id);
        const productSnapshot = await getDoc(productRef);
        if (productSnapshot.exists()) {
            return { id: productSnapshot.id, ...productSnapshot.data() } as Perfume;
        }
        return null;
    } catch (error) {
        console.error('Falha ao ler produto do Firestore:', error);
        return null;
    }
}

export async function getElectronics(): Promise<Eletronico[]> {
  // Removido noStore() daqui para permitir o cache em páginas de listagem.
  try {
    const electronicsCollection = collection(db, 'electronics');
    const electronicsSnapshot = await getDocs(electronicsCollection);
    const electronicsList = electronicsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Eletronico));
    return electronicsList;
  } catch (error) {
    console.error('Falha ao ler eletrônicos do Firestore:', error);
    return [];
  }
}

export async function getElectronicById(id: string): Promise<Eletronico | null> {
    noStore();
    try {
        const electronicRef = doc(db, 'electronics', id);
        const electronicSnapshot = await getDoc(electronicRef);
        if (electronicSnapshot.exists()) {
            return { id: electronicSnapshot.id, ...electronicSnapshot.data() } as Eletronico;
        }
        return null;
    } catch (error) {
        console.error('Falha ao ler eletrônico do Firestore:', error);
        return null;
    }
}


export async function getBebidas(): Promise<Bebida[]> {
  // Removido noStore() daqui para permitir o cache em páginas de listagem.
  try {
    const bebidasCollection = collection(db, 'bebidas');
    const bebidasSnapshot = await getDocs(bebidasCollection);
    const bebidasList = bebidasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Bebida));
    return bebidasList;
  } catch (error) {
    console.error('Falha ao ler bebidas do Firestore:', error);
    return [];
  }
}

export async function getBebidaById(id: string): Promise<Bebida | null> {
    noStore();
    try {
        const bebidaRef = doc(db, 'bebidas', id);
        const bebidaSnapshot = await getDoc(bebidaRef);
        if (bebidaSnapshot.exists()) {
            return { id: bebidaSnapshot.id, ...bebidaSnapshot.data() } as Bebida;
        }
        return null;
    } catch (error) {
        console.error('Falha ao ler bebida do Firestore:', error);
        return null;
    }
}

export async function getBrands(): Promise<string[]> {
  try {
    const brandsCollection = collection(db, 'brands');
    const brandsSnapshot = await getDocs(brandsCollection);
    const brandsList = brandsSnapshot.docs.map(doc => doc.data().name as string);
    return brandsList.sort();
  } catch (error) {
    console.error('Falha ao ler marcas do Firestore:', error);
    return [];
  }
}

export async function getGenders(): Promise<string[]> {
  const products = await getProducts();
  return [...new Set(products.map(p => p.gender))];
}

export async function getOrders(): Promise<Order[]> {
    noStore();
    try {
        const ordersCollection = collection(db, 'orders');
        const ordersSnapshot = await getDocs(ordersCollection);
        const ordersList = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
        return ordersList;
    } catch (error) {
        console.error('Falha ao ler pedidos do Firestore:', error);
        return [];
    }
}
