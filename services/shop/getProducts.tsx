// services/shop/getProducts.ts
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
    this.loadCacheFromStorage();
  }

  /** Load persisted cache */
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

  /** Save to persistent storage */
  private async saveCacheToStorage() {
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
    AsyncStorage.removeItem(CACHE_KEY);
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

      // Merge + remove duplicates
      this.cache = [...this.cache, ...data].filter(
        (v, i, arr) => arr.findIndex(x => x.id === v.id) === i
      );

      const after = this.cache.length;
      const newItems = after - before;

      console.log(`📡 Fetched ${data.length} from server`);
      console.log(`🆕 Added ${newItems} new unique products`);

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
