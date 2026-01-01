import React, { useCallback, useState } from 'react';
import { ObjectInputProps, set } from 'sanity';

type GeocodeHelperProps = ObjectInputProps;

interface SearchResult {
  display_name: string;
  lat: string;
  lon: string;
}

export function GeocodeHelper(props: GeocodeHelperProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) {
      setStatus('❌ Please enter a location to search!');
      return;
    }

    setIsLoading(true);
    setStatus('🔍 Searching for locations...');
    setSearchResults([]);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5&countrycodes=ke`,
        {
          headers: {
            'User-Agent': 'GreenScout-SanityCMS/1.0'
          }
        }
      );
      const data = await response.json();

      if (data && data.length > 0) {
        setSearchResults(data);
        setStatus(`✅ Found ${data.length} location(s). Click one to select.`);
      } else {
        setStatus('❌ No locations found. Try: "Nairobi, Kenya" or "Nakuru High School"');
      }
    } catch (error) {
      setStatus('❌ Error searching. Please try again.');
      console.error('Geocoding error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery]);

  const handleSelectLocation = useCallback((result: SearchResult) => {
    const latitude = parseFloat(result.lat);
    const longitude = parseFloat(result.lon);

    // Patch child fields of the object
    props.onChange([
      set(result.display_name, ['address']),
      set(latitude, ['lat']),
      set(longitude, ['lng'])
    ]);

    setStatus(`🚀 Success! Location and coordinates auto-synced.`);
    setSearchResults([]);
  }, [props]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  }, [handleSearch]);

  const { address, lat, lng } = (props.value as any) || {};

  return (
    <div style={{ marginTop: '8px' }}>
      {/* Search Input */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'stretch'
        }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search location in Kenya..."
            style={{
              flex: 1,
              padding: '12px 14px',
              fontSize: '14px',
              backgroundColor: 'rgba(0,0,0,0.05)',
              color: 'inherit',
              border: '2px solid rgba(5, 150, 105, 0.2)',
              borderRadius: '12px',
              outline: 'none',
              transition: 'all 0.2s'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#059669';
              e.target.style.boxShadow = '0 0 0 3px rgba(5, 150, 105, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(5, 150, 105, 0.2)';
              e.target.style.boxShadow = 'none';
            }}
          />
          <button
            type="button"
            onClick={handleSearch}
            disabled={isLoading}
            style={{
              padding: '0 24px',
              backgroundColor: isLoading ? '#9ca3af' : '#059669',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: '700',
              whiteSpace: 'nowrap',
              transition: 'transform 0.1s, background-color 0.2s',
              boxShadow: '0 4px 12px rgba(5, 150, 105, 0.2)'
            }}
            onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.95)'; }}
            onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            {isLoading ? '🔄 Searching...' : '🔍 Find Location'}
          </button>
        </div>
        <div style={{
          fontSize: '11px',
          color: '#6b7280',
          marginTop: '6px',
          paddingLeft: '4px'
        }}>
          💡 Tip: Include "Kenya" for better precision. Press Enter to search.
        </div>
      </div>

      {/* Status Message */}
      {status && (
        <div
          style={{
            padding: '12px',
            marginBottom: '12px',
            borderRadius: '6px',
            fontSize: '13px',
            backgroundColor: status.startsWith('✅') ? '#f0fdf4' : status.startsWith('❌') ? '#fef2f2' : '#eff6ff',
            border: `2px solid ${status.startsWith('✅') ? '#86efac' : status.startsWith('❌') ? '#fca5a5' : '#93c5fd'}`,
            color: status.startsWith('✅') ? '#166534' : status.startsWith('❌') ? '#991b1b' : '#1e40af'
          }}
        >
          {status}
        </div>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div
          style={{
            marginBottom: '16px',
            border: '1px solid rgba(5, 150, 105, 0.3)',
            borderRadius: '12px',
            overflow: 'hidden',
            backgroundColor: 'rgba(0,0,0,0.02)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}
        >
          {searchResults.map((result, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelectLocation(result)}
              style={{
                width: '100%',
                padding: '14px 16px',
                textAlign: 'left',
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: index < searchResults.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                cursor: 'pointer',
                fontSize: '13px',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(5, 150, 105, 0.05)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <div style={{ fontWeight: '700', color: '#059669', marginBottom: '2px' }}>
                📍 {result.display_name.split(',')[0]}
              </div>
              <div style={{ fontSize: '11px', opacity: 0.7 }}>
                {result.display_name}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Sync Status */}
      {address && lat && lng && (
        <div
          style={{
            padding: '12px',
            borderRadius: '6px',
            fontSize: '13px',
            backgroundColor: '#f0fdf4',
            border: '2px solid #86efac',
            color: '#166534',
            marginBottom: '12px'
          }}
        >
          <div style={{ fontWeight: '600' }}>
            ✨ Location & coordinates are perfectly in sync.
          </div>
        </div>
      )}

      {/* Render the actual fields below for manual overrides */}
      <div style={{
        padding: '20px',
        backgroundColor: 'rgba(0,0,0,0.02)',
        borderRadius: '16px',
        border: '1px solid rgba(0,0,0,0.05)',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <div style={{ marginBottom: '12px', fontSize: '12px', fontWeight: '700', opacity: 0.5, textTransform: 'uppercase', tracking: '1px' }}>
          Manual Overrides
        </div>
        {props.renderDefault(props)}
      </div>
    </div>
  );
}
