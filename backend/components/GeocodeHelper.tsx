import React, { useCallback, useState } from 'react';
import { StringInputProps, set, unset } from 'sanity';

type GeocodeHelperProps = StringInputProps;

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
    
    // Create the coordinates string
    const coordinatesString = `${latitude},${longitude}`;
    
    // Use Sanity's set patch to update the value
    props.onChange(set(coordinatesString));
    
    setStatus(`✅ Selected: ${result.display_name}`);
    setSearchResults([]);
  }, [props]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  }, [handleSearch]);

  const coordinates = props.value ? props.value.split(',') : null;

  return (
    <div style={{ marginTop: '8px' }}>
      {/* Search Input */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{ 
          display: 'flex', 
          gap: '8px',
          alignItems: 'stretch'
        }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search location in Kenya (e.g., Nairobi, Nakuru High School)"
            style={{
              flex: 1,
              padding: '10px 12px',
              fontSize: '14px',
              border: '2px solid #d1d5db',
              borderRadius: '6px',
              outline: 'none'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#059669';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
            }}
          />
          <button
            type="button"
            onClick={handleSearch}
            disabled={isLoading}
            style={{
              padding: '10px 20px',
              backgroundColor: isLoading ? '#9ca3af' : '#059669',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              whiteSpace: 'nowrap'
            }}
          >
            {isLoading ? '🔄 Searching...' : '🔍 Search'}
          </button>
        </div>
        <div style={{ 
          fontSize: '11px', 
          color: '#6b7280', 
          marginTop: '4px' 
        }}>
          💡 Tip: Include "Kenya" for better results. Press Enter to search.
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
            marginBottom: '12px',
            border: '2px solid #e5e7eb',
            borderRadius: '6px',
            overflow: 'hidden'
          }}
        >
          {searchResults.map((result, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelectLocation(result)}
              style={{
                width: '100%',
                padding: '12px',
                textAlign: 'left',
                backgroundColor: 'white',
                border: 'none',
                borderBottom: index < searchResults.length - 1 ? '1px solid #e5e7eb' : 'none',
                cursor: 'pointer',
                fontSize: '13px',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              <div style={{ fontWeight: '600', color: '#059669', marginBottom: '4px' }}>
                📍 {result.display_name.split(',')[0]}
              </div>
              <div style={{ fontSize: '11px', color: '#6b7280' }}>
                {result.display_name}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Selected Coordinates */}
      {coordinates && coordinates.length === 2 && (
        <div
          style={{
            padding: '12px',
            borderRadius: '6px',
            fontSize: '13px',
            backgroundColor: '#fef3c7',
            border: '2px solid #fbbf24',
            color: '#92400e'
          }}
        >
          <div style={{ fontWeight: '600', marginBottom: '8px' }}>
            ✅ Coordinates Selected - Copy these values:
          </div>
          <code
            style={{
              display: 'block',
              padding: '8px',
              backgroundColor: '#fffbeb',
              borderRadius: '4px',
              fontSize: '12px',
              marginBottom: '8px',
              fontFamily: 'monospace'
            }}
          >
            Latitude: {parseFloat(coordinates[0]).toFixed(6)}
            <br />
            Longitude: {parseFloat(coordinates[1]).toFixed(6)}
          </code>
          <div style={{ fontSize: '11px', color: '#78350f' }}>
            📋 Scroll down to "Map Coordinates" and paste these into the Latitude and Longitude fields.
          </div>
        </div>
      )}
    </div>
  );
}

