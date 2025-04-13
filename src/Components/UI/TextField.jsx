const InputField = ({
    type = 'text',
    placeholder,
    icon,
    pattern,
    title,
    minLength,
    maxLength,
    hint,
    required = true,
    onChange
  }) => {
    return (
      <div className="mb-4">
        <label className="input validator">
          {icon && (
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              dangerouslySetInnerHTML={{ __html: icon }}
            />
          )}
          <input
            type={type}
            required={required}
            placeholder={placeholder}
            pattern={pattern}
            title={title}
            minLength={minLength}
            maxLength={maxLength}
            className="flex-1"
            onChange={(e) => onChange(e.target.value)}
          />
        </label>
        {hint && (
          <p className="validator-hint">
            {hint.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </p>
        )}
      </div>
    );
  };
  
  export default InputField;
  