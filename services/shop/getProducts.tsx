import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@/supabaseConfig';
import type { AddProductPayload } from '@/types/models/shop/addProductPayload';

const PAGE_LIMIT = 20;
const CACHE_KEY = 'PRODUCT_CACHE_V1';

class ProductService {
  private cache: AddProductPayload[] = [];
  private page: number = 0;
  private hasMore: boolean = true;

  constructor() {
    // Only try loading cache on native
    if (Platform.OS !== 'web') {
      this.loadCacheFromStorage();
    }
  }

  private async loadCacheFromStorage() {
    try {
      const raw = await AsyncStorage.getItem(CACHE_KEY);
      if (raw) {
        this.cache = JSON.parse(raw);
        console.log("📦 Loaded products from local cache:", this.cache.length);
      }
    } catch (e) {
      console.log("❌ Failed to load cache", e);
    }
  }

  private async saveCacheToStorage() {
    if (Platform.OS === 'web') return; // skip storage on web
    try {
      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(this.cache));
      console.log("💾 Cache saved to disk:", this.cache.length);
    } catch (e) {
      console.log("❌ Failed to save cache", e);
    }
  }

  getCachedProducts() {
    return this.cache;
  }

  hasMoreProducts() {
    return this.hasMore;
  }

  reset() {
    console.log("🔄 Resetting product cache...");
    this.cache = [];
    this.page = 0;
    this.hasMore = true;

    if (Platform.OS !== 'web') AsyncStorage.removeItem(CACHE_KEY);
  }

  async fetchNext(): Promise<AddProductPayload[]> {
    if (!this.hasMore) return this.cache;

    const from = this.page * PAGE_LIMIT;
    const to = from + PAGE_LIMIT - 1;

    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) throw error;

      if (!data || data.length === 0) {
        this.hasMore = false;
        return this.cache;
      }

      const before = this.cache.length;

      this.cache = [...this.cache, ...data].filter(
        (v, i, arr) => arr.findIndex(x => x.id === v.id) === i
      );

      const newItems = this.cache.length - before;
      console.log(`📡 Fetched ${data.length} from server, 🆕 ${newItems} new`);

      await this.saveCacheToStorage();
      this.page += 1;

      return this.cache;
    } catch (err) {
      console.error('❌ Failed to fetch products:', err);
      throw err;
    }
  }
}

export const productService = new ProductService();
