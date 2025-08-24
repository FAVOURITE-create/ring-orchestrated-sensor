import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.5.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.170.0/testing/asserts.ts';

Clarinet.test({
    name: "Sensor Data Orchestrator: Create Listing",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const listingResult = chain.callPublicFn('sensor-orchestrator', 'create-listing', [
            types.ascii('Urban Temperature Stream'),
            types.utf8('Hourly temperature data from metropolitan sensors'),
            types.uint(1000000),
            types.ascii('weather'),
            types.utf8('https://preview.example.com/temp-data'),
            types.utf8('https://full.example.com/temp-dataset'),
            types.uint(10)
        ], deployer);
        
        // Add assertions based on the new contract logic
        assertEquals(listingResult.result, 'u1');
    }
});

Clarinet.test({
    name: "Sensor Data Orchestrator: Purchase Data Stream",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const buyer = accounts.get('wallet_1')!;

        // Create a listing first
        chain.callPublicFn('sensor-orchestrator', 'create-listing', [
            types.ascii('Urban Temperature Stream'),
            types.utf8('Hourly temperature data from metropolitan sensors'),
            types.uint(1000000),
            types.ascii('weather'),
            types.utf8('https://preview.example.com/temp-data'),
            types.utf8('https://full.example.com/temp-dataset'),
            types.uint(10)
        ], deployer);

        // Attempt to purchase the data stream
        const purchaseResult = chain.callPublicFn('sensor-orchestrator', 'purchase-asset', [
            types.uint(1)
        ], buyer);

        // Add assertions to validate purchase
        assertEquals(purchaseResult.result, 'true');
    }
});