import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import { Button, Textfield, Icon } from 'xtreme-ui';

// Country codes with flags and validation patterns
const COUNTRIES = [
  { code: '+1', flag: '🇺🇸', name: 'United States', pattern: /^(\+1[-\s]?)?[2-9]\d{2}[-\s]?\d{3}[-\s]?\d{4}$/ },
  { code: '+91', flag: '🇮🇳', name: 'India', pattern: /^(\+91[-\s]?)?[6-9]\d{9}$/ },
  { code: '+44', flag: '🇬🇧', name: 'United Kingdom', pattern: /^(\+44[-\s]?)?[1-9]\d{8,9}$/ },
  { code: '+33', flag: '🇫🇷', name: 'France', pattern: /^(\+33[-\s]?)?[1-9]\d{8}$/ },
  { code: '+49', flag: '🇩🇪', name: 'Germany', pattern: /^(\+49[-\s]?)?[1-9]\d{10,11}$/ },
  { code: '+86', flag: '🇨🇳', name: 'China', pattern: /^(\+86[-\s]?)?1[3-9]\d{9}$/ },
  { code: '+81', flag: '🇯🇵', name: 'Japan', pattern: /^(\+81[-\s]?)?[7-9]\d{9}$/ },
  { code: '+61', flag: '🇦🇺', name: 'Australia', pattern: /^(\+61[-\s]?)?[2-9]\d{8}$/ },
  { code: '+34', flag: '🇪🇸', name: 'Spain', pattern: /^(\+34[-\s]?)?[6-9]\d{8}$/ },
  { code: '+39', flag: '🇮🇹', name: 'Italy', pattern: /^(\+39[-\s]?)?[3]\d{8,9}$/ },
  { code: '+212', flag: '🇲🇦', name: 'Morocco', pattern: /^(\+212[-\s]?)?[5-7]\d{8}$/ },
  { code: '+213', flag: '🇩🇿', name: 'Algeria', pattern: /^(\+213[-\s]?)?[5-7]\d{8}$/ },
  { code: '+216', flag: '🇹🇳', name: 'Tunisia', pattern: /^(\+216[-\s]?)?[2-9]\d{7}$/ },
  { code: '+218', flag: '🇱🇾', name: 'Libya', pattern: /^(\+218[-\s]?)?[9]\d{8}$/ },
  { code: '+20',  flag: '🇪🇬', name: 'Egypt', pattern: /^(\+20[-\s]?)?1[0-2]\d{8}$/ }
];

const UserLogin = ({ setOpen }) => {
  const pathname = usePathname();
  const params = useSearchParams();
  const [page, setPage] = useState('phone');
  const [buttonLabel, setButtonLabel] = useState('Next');
  const [busy, setBusy] = useState(false);

  // Country and phone state
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[10]); // Default to India
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [phone, setPhone] = useState('');
  const [countrySearch, setCountrySearch] = useState('');
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);

  // User details
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [heading, setHeading] = useState(['Let\'s', ' start ordering']);

  const fullPhoneNumber = `${selectedCountry.code}${phone}`;

  const filteredCountries = COUNTRIES.filter(country => 
    country.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
    country.code.includes(countrySearch)
  );

  const validatePhone = (phoneNumber, country) => {
    return country.pattern.test(phoneNumber);
  };

  const onNext = async () => {
    if (page === 'phone') {
      if (!phone.trim()) {
        return toast.error('Please enter your phone number');
      }
      
      if (!validatePhone(fullPhoneNumber, selectedCountry)) {
        return toast.error(`Please enter a valid ${selectedCountry.name} phone number`);
      }

      setBusy(true);
      setTimeout(() => {
        setBusy(false);
        setPage('signOTP');
      }, 400);
    }
    else if (page === 'signOTP' || page === 'loginOTP') {
      if (!params.get('table')) return toast.error('Please scan the QR Code');
      if (!fname.trim()) return toast.error('First name is required');
      if (!lname.trim()) return toast.error('Last name is required');

      setBusy(true);

      const res = await signIn('customer', {
        redirect: false,
        restaurant: pathname.replaceAll('/', ''),
        phone: fullPhoneNumber,
        fname: fname.trim(),
        lname: lname.trim(),
        table: params.get('table'),
        callbackUrl: `${window.location.origin}`,
      });

      if (res?.error) {
        toast.error(res?.error);
      } else {
        toast.success('Welcome! You can now place your order.');
      }
      setOpen(false);
      setBusy(false);
    }
  };

  useEffect(() => {
    if (page === 'phone') {
      setHeading(['Let\'s', ' start ordering']);
      setButtonLabel('Next');
    } else if (page === 'signOTP') {
      setHeading(['Almost', ' there!']);
      setButtonLabel('Start Ordering');
    } else if (page === 'loginOTP') {
      setHeading(['Welcome', ' back!']);
      setButtonLabel('Log In');
    }
  }, [page]);

  return (
    <div className={`userLogin ${page}`}>
      <div className='header'>
        <span className='heading'>
          <span>{heading[0]}</span>{heading[1]}
        </span>
      </div>

      <div className='content'>
        {/* Phone Input Section */}
        {page === 'phone' && (
          <div className='phoneSection'>
            <div className={`phoneInputGroup ${isPhoneFocused ? 'focused' : ''}`}>
              {/* Country Selector */}
              <div className='countrySelector'>
                <button 
                  type="button"
                  className='countryButton'
                  onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                >
                  <span className='countryFlag'>{selectedCountry.flag}</span>
                  <span className='countryCode'>{selectedCountry.code}</span>
                  <Icon code="f107" className='dropdownIcon' />
                </button>
                
                {/* Country Dropdown */}
                {showCountryDropdown && (
                  <>
                    <div 
                      className='countryBackdrop' 
                      onClick={() => setShowCountryDropdown(false)} 
                    />
                    <div className='countryDropdown'>
                      {/* Search in dropdown */}
                      <div className='searchCountry'>
                        <Icon code="f002" className='searchIcon' />
                        <input
                          type="text"
                          placeholder="Search countries..."
                          value={countrySearch}
                          onChange={(e) => setCountrySearch(e.target.value)}
                          className='searchInput'
                        />
                      </div>
                      
                      {/* Country list */}
                      <div className='countryList'>
                        {filteredCountries.map((country) => (
                          <div
                            key={country.code}
                            className={`countryItem ${selectedCountry.code === country.code ? 'selected' : ''}`}
                            onClick={() => {
                              setSelectedCountry(country);
                              setShowCountryDropdown(false);
                              setCountrySearch('');
                              setPhone('');
                            }}
                          >
                            <span className='flag'>{country.flag}</span>
                            <div className='countryInfo'>
                              <span className='countryName'>{country.name}</span>
                              <span className='dialCode'>{country.code}</span>
                            </div>
                            {selectedCountry.code === country.code && (
                              <Icon code="f00c" className='checkIcon' />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Phone Input */}
              <div className='phoneInputWrapper'>
                <input
                  type='tel'
                  className='phoneInput'
                  autoComplete='tel-local'
                  value={phone}
                  onFocus={() => setIsPhoneFocused(true)}
                  onBlur={() => setIsPhoneFocused(false)}
                  onKeyDown={(e) => e.key === 'Enter' && onNext()}
                  onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="Enter phone number"
                />
              </div>
            </div>
            
            {/* Phone preview */}
            {phone && (
              <div className='phonePreview'>
                <Icon code="f095" className='phoneIcon' />
                <span>We'll call you at: {fullPhoneNumber}</span>
              </div>
            )}
          </div>
        )}

        {/* Name Fields for signup */}
        {(page === 'signOTP' || page === 'loginOTP') && (
          <div className='nameSection'>
            <div className='nameInputs'>
              <div className='inputGroup'>
                <Icon code="f007" className='inputIcon' />
                <input
                  className='nameInput'
                  placeholder='First Name'
                  autoComplete='given-name'
                  value={fname}
                  onChange={(e) => setFName(e.target.value)}
                />
              </div>
              
              <div className='inputGroup'>
                <Icon code="f007" className='inputIcon' />
                <input
                  className='nameInput'
                  placeholder='Last Name'
                  autoComplete='family-name'
                  onKeyDown={(e) => e.key === 'Enter' && onNext()}
                  value={lname}
                  onChange={(e) => setLName(e.target.value)}
                />
              </div>
            </div>
            
            <div className='welcomeMessage'>
              <Icon code="f0a1" className='welcomeIcon' />
              <p>Great choice! Let's get your table ready for an amazing dining experience.</p>
            </div>
          </div>
        )}
      </div>

      <div className='footer'>
        <Button 
          label={buttonLabel} 
          onClick={onNext} 
          loading={busy}
          disabled={page === 'phone' ? !phone.trim() : (!fname.trim() || !lname.trim())}
        />
      </div>

      {/* Fixed Styles - No z-index conflicts */}
      <style jsx>{`
        .userLogin {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 0;
          margin: 0;
          position: relative;
          overflow: visible;
        }

        .header {
          padding: 0 0 20px 0;
          text-align: center;
        }

        .heading {
          font-size: 24px;
          font-weight: 300;
          color: var(--colorContentPrimary);
        }

        .heading span {
          font-weight: 500;
        }

        .content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0;
          margin: 0;
        }

        .phoneSection {
          width: 100%;
          margin-bottom: 20px;
        }

        .phoneInputGroup {
          display: flex;
          gap: 8px;
          margin-bottom: 16px;
          align-items: stretch;
        }

        .phoneInputGroup.focused {
          /* Add focus styling if needed */
        }

        .countrySelector {
          position: relative;
          flex-shrink: 0;
        }

        .countryButton {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 12px 10px;
          border: 1px solid var(--colorContentTertiary);
          border-radius: 8px;
          background: var(--colorBackgroundPrimary);
          cursor: pointer;
          transition: all 0.2s ease;
          min-width: 90px;
          height: 44px;
          font-size: 14px;
        }

        .countryButton:hover {
          border-color: hsl(var(--colorBrandPrimary));
        }

        .countryFlag {
          font-size: 16px;
        }

        .countryCode {
          font-size: 13px;
          font-weight: 600;
          color: var(--colorContentPrimary);
        }

        .dropdownIcon {
          margin-left: auto;
          color: var(--colorContentSecondary);
          font-size: 10px;
        }

        .countryBackdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 998;
        }

        .countryDropdown {
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          right: 0;
          background: var(--colorBackgroundPrimary);
          border: 1px solid var(--colorContentTertiary);
          border-radius: 12px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
          z-index: 999;
          overflow: hidden;
          max-height: 250px;
        }

        .searchCountry {
          position: relative;
          padding: 8px;
          border-bottom: 1px solid var(--colorContentTertiary);
        }

        .searchIcon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--colorContentSecondary);
          font-size: 12px;
        }

        .searchInput {
          width: 100%;
          padding: 8px 12px 8px 32px;
          border: 1px solid var(--colorContentTertiary);
          border-radius: 6px;
          background: var(--colorBackgroundSecondary);
          font-size: 13px;
          outline: none;
        }

        .countryList {
          max-height: 180px;
          overflow-y: auto;
        }

        .countryItem {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .countryItem:hover {
          background: var(--colorBackgroundSecondary);
        }

        .countryItem.selected {
          background: hsl(var(--colorBrandPrimary));
          color: white;
        }

        .flag {
          font-size: 16px;
        }

        .countryInfo {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .countryName {
          font-size: 13px;
          font-weight: 500;
        }

        .dialCode {
          font-size: 11px;
          opacity: 0.7;
        }

        .checkIcon {
          color: white;
          font-size: 12px;
        }

        .phoneInputWrapper {
          flex: 1;
        }

        .phoneInput {
          width: 100%;
          padding: 12px 14px;
          border: 1px solid var(--colorContentTertiary);
          border-radius: 8px;
          font-size: 16px;
          background: var(--colorBackgroundPrimary);
          color: var(--colorContentPrimary);
          outline: none;
          transition: all 0.2s ease;
          height: 44px;
          box-sizing: border-box;
        }

        .phoneInput:focus {
          border-color: hsl(var(--colorBrandPrimary));
          box-shadow: 0 0 0 2px hsla(var(--colorBrandPrimary), 0.2);
        }

        .phoneInput::placeholder {
          color: var(--colorContentSecondary);
          opacity: 0.7;
        }

        .phonePreview {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          background: var(--colorBackgroundSecondary);
          border-radius: 8px;
          border: 1px solid var(--colorContentTertiary);
          margin-top: 8px;
        }

        .phoneIcon {
          color: hsl(var(--colorBrandPrimary));
          font-size: 14px;
        }

        .phonePreview span {
          font-size: 13px;
          color: var(--colorContentSecondary);
        }

        .nameSection {
          width: 100%;
        }

        .nameInputs {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 16px;
        }

        .inputGroup {
          position: relative;
          display: flex;
          align-items: center;
        }

        .inputIcon {
          position: absolute;
          left: 14px;
          color: var(--colorContentSecondary);
          font-size: 14px;
          z-index: 1;
        }

        .nameInput {
          width: 100%;
          padding: 12px 14px 12px 40px;
          border: 1px solid var(--colorContentTertiary);
          border-radius: 8px;
          font-size: 16px;
          background: var(--colorBackgroundPrimary);
          color: var(--colorContentPrimary);
          outline: none;
          transition: all 0.2s ease;
        }

        .nameInput:focus {
          border-color: hsl(var(--colorBrandPrimary));
          box-shadow: 0 0 0 2px hsla(var(--colorBrandPrimary), 0.2);
        }

        .nameInput:focus + .inputIcon {
          color: hsl(var(--colorBrandPrimary));
        }

        .welcomeMessage {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 12px;
          background: linear-gradient(135deg, hsla(var(--colorBrandPrimary), 0.1), hsla(var(--colorBrandPrimary), 0.05));
          border-radius: 8px;
          border: 1px solid hsla(var(--colorBrandPrimary), 0.2);
        }

        .welcomeIcon {
          color: hsl(var(--colorBrandPrimary));
          font-size: 16px;
          margin-top: 1px;
        }

        .welcomeMessage p {
          margin: 0;
          font-size: 13px;
          color: var(--colorContentPrimary);
          line-height: 1.4;
        }

        .footer {
          padding-top: 20px;
          display: flex;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default UserLogin;