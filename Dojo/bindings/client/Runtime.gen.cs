
// To disable generating this file set `isEnabledGeneratingRuntimeCode` to `false` in the config file for generating C# code.

// <auto-generated>
//  This code was generated by the following tool on 2023-11-30 21:25:18 GMT-05:00:
//      https://github.com/bottlenoselabs/c2cs (v0.0.0.0)
//
//  Changes to this file may cause incorrect behavior and will be lost if the code is regenerated.
// </auto-generated>
// ReSharper disable All

#region Template
#nullable enable
#pragma warning disable CS1591
#pragma warning disable CS8981
using bottlenoselabs.C2CS.Runtime;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Runtime.InteropServices;
using System.Runtime.CompilerServices;
#endregion

namespace bottlenoselabs.C2CS.Runtime
{

    /// <summary>
    ///     Specifies a C `const` for a parameter or return value.
    /// </summary>
    [AttributeUsage(AttributeTargets.Parameter | AttributeTargets.ReturnValue)]
    public sealed class CConstAttribute : Attribute
    {
        // marker
    }

    /// <summary>
    ///     Specifies a C node with a specific kind for a C# type.
    /// </summary>
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Struct | AttributeTargets.Method | AttributeTargets.Enum | AttributeTargets.Field)]
    public sealed class CNodeAttribute : Attribute
    {
        /// <summary>
        ///     Gets or sets the C node kind.
        /// </summary>
        public string Kind { get; set; } = string.Empty;
    }

    /// <summary>
    ///     A boolean value type with the same memory layout as a <see cref="byte" /> in both managed and unmanaged contexts;
    ///     equivalent to a standard bool found in C/C++/ObjC where <c>0</c> is <c>false</c> and any other value is
    ///     <c>true</c>.
    /// </summary>
    [StructLayout(LayoutKind.Sequential)]
    public readonly struct CBool : IEquatable<CBool>
    {
        public readonly byte Value;

        private CBool(bool value)
        {
            Value = Convert.ToByte(value);
        }

        /// <summary>
        ///     Converts the specified <see cref="bool" /> to a <see cref="CBool" />.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns>A <see cref="CBool" />.</returns>
        public static implicit operator CBool(bool value)
        {
            return FromBoolean(value);
        }

        /// <summary>
        ///     Converts the specified <see cref="bool" /> to a <see cref="CBool" />.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns>A <see cref="CBool" />.</returns>
        public static CBool FromBoolean(bool value)
        {
            return new CBool(value);
        }

        /// <summary>
        ///     Converts the specified <see cref="CBool" /> to a <see cref="bool" />.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns>A <see cref="bool" />.</returns>
        public static implicit operator bool(CBool value)
        {
            return ToBoolean(value);
        }

        /// <summary>
        ///     Converts the specified <see cref="CBool" /> to a <see cref="bool" />.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns>A <see cref="bool" />.</returns>
        public static bool ToBoolean(CBool value)
        {
            return Convert.ToBoolean(value.Value);
        }

        /// <inheritdoc />
        public override string ToString()
        {
            return ToBoolean(this).ToString();
        }

        /// <inheritdoc />
        public override bool Equals(object? obj)
        {
            return obj is CBool b && Equals(b);
        }

        /// <inheritdoc />
        public bool Equals(CBool other)
        {
            return Value == other.Value;
        }

        /// <inheritdoc />
        public override int GetHashCode()
        {
            return Value.GetHashCode();
        }

        /// <summary>
        ///     Returns a value that indicates whether two specified <see cref="CBool" /> structures are equal.
        /// </summary>
        /// <param name="left">The first <see cref="CBool" /> to compare.</param>
        /// <param name="right">The second <see cref="CBool" /> to compare.</param>
        /// <returns><c>true</c> if <paramref name="left" /> and <paramref name="right" /> are equal; otherwise, <c>false</c>.</returns>
        public static bool operator ==(CBool left, CBool right)
        {
            return left.Value == right.Value;
        }

        /// <summary>
        ///     Returns a value that indicates whether two specified <see cref="CBool" /> structures are not equal.
        /// </summary>
        /// <param name="left">The first <see cref="CBool" /> to compare.</param>
        /// <param name="right">The second <see cref="CBool" /> to compare.</param>
        /// <returns><c>true</c> if <paramref name="left" /> and <paramref name="right" /> are not equal; otherwise, <c>false</c>.</returns>
        public static bool operator !=(CBool left, CBool right)
        {
            return !(left == right);
        }

        /// <summary>
        ///     Returns a value that indicates whether two specified <see cref="CBool" /> structures are equal.
        /// </summary>
        /// <param name="left">The first <see cref="CBool" /> to compare.</param>
        /// <param name="right">The second <see cref="CBool" /> to compare.</param>
        /// <returns><c>true</c> if <paramref name="left" /> and <paramref name="right" /> are equal; otherwise, <c>false</c>.</returns>
        public static bool Equals(CBool left, CBool right)
        {
            return left.Value == right.Value;
        }
    }

    /// <summary>
    ///     A value type with the same memory layout as a <see cref="byte" /> in a managed context and <c>char</c> in
    ///     an unmanaged context.
    /// </summary>
    [StructLayout(LayoutKind.Sequential)]
    public readonly struct CChar : IEquatable<byte>, IEquatable<CChar>
    {
        public readonly byte Value;

        private CChar(byte value)
        {
            Value = Convert.ToByte(value);
        }

        /// <summary>
        ///     Converts the specified <see cref="byte" /> to a <see cref="CChar" />.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns>A <see cref="CChar" />.</returns>
        public static implicit operator CChar(byte value)
        {
            return FromByte(value);
        }

        /// <summary>
        ///     Converts the specified <see cref="byte" /> to a <see cref="CChar" />.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns>A <see cref="CChar" />.</returns>
        public static CChar FromByte(byte value)
        {
            return new CChar(value);
        }

        /// <summary>
        ///     Converts the specified <see cref="CChar" /> to a <see cref="byte" />.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns>A <see cref="byte" />.</returns>
        public static implicit operator byte(CChar value)
        {
            return ToByte(value);
        }

        /// <summary>
        ///     Converts the specified <see cref="CChar" /> to a <see cref="byte" />.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns>A <see cref="byte" />.</returns>
        public static byte ToByte(CChar value)
        {
            return value.Value;
        }

        /// <inheritdoc />
        public override string ToString()
        {
            return Value.ToString(CultureInfo.InvariantCulture);
        }

        /// <inheritdoc />
        public override bool Equals(object? obj)
        {
            return obj is CChar value && Equals(value);
        }

        /// <inheritdoc />
        public bool Equals(byte other)
        {
            return Value == other;
        }

        /// <inheritdoc />
        public bool Equals(CChar other)
        {
            return Value == other.Value;
        }

        /// <inheritdoc />
        public override int GetHashCode()
        {
            return Value.GetHashCode();
        }

        /// <summary>
        ///     Returns a value that indicates whether two specified <see cref="CChar" /> structures are equal.
        /// </summary>
        /// <param name="left">The first <see cref="CChar" /> to compare.</param>
        /// <param name="right">The second <see cref="CChar" /> to compare.</param>
        /// <returns><c>true</c> if <paramref name="left" /> and <paramref name="right" /> are equal; otherwise, <c>false</c>.</returns>
        public static bool operator ==(CChar left, CChar right)
        {
            return left.Value == right.Value;
        }

        /// <summary>
        ///     Returns a value that indicates whether two specified <see cref="CChar" /> structures are not equal.
        /// </summary>
        /// <param name="left">The first <see cref="CChar" /> to compare.</param>
        /// <param name="right">The second <see cref="CChar" /> to compare.</param>
        /// <returns><c>true</c> if <paramref name="left" /> and <paramref name="right" /> are not equal; otherwise, <c>false</c>.</returns>
        public static bool operator !=(CChar left, CChar right)
        {
            return !(left == right);
        }

        /// <summary>
        ///     Returns a value that indicates whether two specified <see cref="CChar" /> structures are equal.
        /// </summary>
        /// <param name="left">The first <see cref="CChar" /> to compare.</param>
        /// <param name="right">The second <see cref="CChar" /> to compare.</param>
        /// <returns><c>true</c> if <paramref name="left" /> and <paramref name="right" /> are equal; otherwise, <c>false</c>.</returns>
        public static bool Equals(CChar left, CChar right)
        {
            return left.Value == right.Value;
        }
    }

    /// <summary>
    ///     A pointer value type of bytes that represent a string; the C type `char*`.
    /// </summary>
    [StructLayout(LayoutKind.Sequential)]
    public readonly unsafe struct CString : IEquatable<CString>, IDisposable
    {
        public readonly nint Pointer;

        /// <summary>
        ///     Gets a value indicating whether this <see cref="CString" /> is a null pointer.
        /// </summary>
        public bool IsNull => Pointer == 0;

        /// <summary>
        ///     Initializes a new instance of the <see cref="CString" /> struct.
        /// </summary>
        /// <param name="value">The pointer value.</param>
        public CString(byte* value)
        {
            Pointer = (nint)value;
        }

        /// <summary>
        ///     Initializes a new instance of the <see cref="CString" /> struct.
        /// </summary>
        /// <param name="value">The pointer value.</param>
        public CString(nint value)
        {
            Pointer = value;
        }

        /// <summary>
        ///     Initializes a new instance of the <see cref="CString" /> struct.
        /// </summary>
        /// <param name="s">The string value.</param>
        public CString(string s)
        {
            Pointer = FromString(s).Pointer;
        }

        /// <summary>
        ///     Attempts to free the memory pointed by the <see cref="CString "/>.
        /// </summary>
        public void Dispose()
        {
            Marshal.FreeHGlobal(Pointer);
        }

        /// <summary>
        ///     Performs an explicit conversion from an <see cref="IntPtr" /> to a <see cref="CString" />.
        /// </summary>
        /// <param name="value">The pointer value.</param>
        /// <returns>
        ///     The resulting <see cref="CString" />.
        /// </returns>
        public static explicit operator CString(nint value)
        {
            return FromIntPtr(value);
        }

        /// <summary>
        ///     Performs an explicit conversion from an <see cref="IntPtr" /> to a <see cref="CString" />.
        /// </summary>
        /// <param name="value">The pointer value.</param>
        /// <returns>
        ///     The resulting <see cref="CString" />.
        /// </returns>
        public static CString FromIntPtr(nint value)
        {
            return new CString(value);
        }

        /// <summary>
        ///     Performs an implicit conversion from a byte pointer to a <see cref="CString" />.
        /// </summary>
        /// <param name="value">The pointer value.</param>
        /// <returns>
        ///     The resulting <see cref="CString" />.
        /// </returns>
        public static implicit operator CString(byte* value)
        {
            return From(value);
        }

        /// <summary>
        ///     Performs an implicit conversion from a byte pointer to a <see cref="CString" />.
        /// </summary>
        /// <param name="value">The pointer value.</param>
        /// <returns>
        ///     The resulting <see cref="CString" />.
        /// </returns>
        public static CString From(byte* value)
        {
            return new CString((nint)value);
        }

        /// <summary>
        ///     Performs an implicit conversion from a <see cref="CString" /> to a <see cref="IntPtr" />.
        /// </summary>
        /// <param name="value">The pointer.</param>
        /// <returns>
        ///     The resulting <see cref="IntPtr" />.
        /// </returns>
        public static implicit operator nint(CString value)
        {
            return value.Pointer;
        }

        /// <summary>
        ///     Performs an implicit conversion from a <see cref="CString" /> to a <see cref="IntPtr" />.
        /// </summary>
        /// <param name="value">The pointer.</param>
        /// <returns>
        ///     The resulting <see cref="IntPtr" />.
        /// </returns>
        public static nint ToIntPtr(CString value)
        {
            return value.Pointer;
        }

        /// <summary>
        ///     Performs an explicit conversion from a <see cref="CString" /> to a <see cref="string" />.
        /// </summary>
        /// <param name="value">The <see cref="CString" />.</param>
        /// <returns>
        ///     The resulting <see cref="string" />.
        /// </returns>
        public static explicit operator string(CString value)
        {
            return ToString(value);
        }

        /// <summary>
        ///     Converts a C style string (ANSI or UTF-8) of type `char` (one dimensional byte array
        ///     terminated by a <c>0x0</c>) to a UTF-16 <see cref="string" /> by allocating and copying.
        /// </summary>
        /// <param name="value">A pointer to the C string.</param>
        /// <returns>A <see cref="string" /> equivalent of <paramref name="value" />.</returns>
        public static string ToString(CString value)
        {
            if (value.IsNull)
            {
                return string.Empty;
            }

            // calls ASM/C/C++ functions to calculate length and then "FastAllocate" the string with the GC
            // https://mattwarren.org/2016/05/31/Strings-and-the-CLR-a-Special-Relationship/
            var result = Marshal.PtrToStringAnsi(value.Pointer);

            if (string.IsNullOrEmpty(result))
            {
                return string.Empty;
            }

            return result;
        }

        /// <summary>
        ///     Performs an explicit conversion from a <see cref="string" /> to a <see cref="CString" />.
        /// </summary>
        /// <param name="s">The <see cref="string" />.</param>
        /// <returns>
        ///     The resulting <see cref="CString" />.
        /// </returns>
        public static explicit operator CString(string s)
        {
            return FromString(s);
        }

        /// <summary>
        ///     Converts a UTF-16 <see cref="string" /> to a C style string (one dimensional byte array terminated by a
        ///     <c>0x0</c>) by allocating and copying.
        /// </summary>
        /// <param name="str">The <see cref="string" />.</param>
        /// <returns>A C string pointer.</returns>
        public static CString FromString(string str)
        {
            var pointer = Marshal.StringToHGlobalAnsi(str);
            return new CString(pointer);
        }

        /// <inheritdoc />
        public override string ToString()
        {
            return ToString(this);
        }

        /// <inheritdoc />
        public override bool Equals(object? obj)
        {
            return obj is CString value && Equals(value);
        }

        /// <inheritdoc />
        public bool Equals(CString other)
        {
            return Pointer == other.Pointer;
        }

        /// <inheritdoc />
        public override int GetHashCode()
        {
            return Pointer.GetHashCode();
        }

        /// <summary>
        ///     Returns a value that indicates whether two specified <see cref="CString" /> structures are equal.
        /// </summary>
        /// <param name="left">The first <see cref="CString" /> to compare.</param>
        /// <param name="right">The second <see cref="CString" /> to compare.</param>
        /// <returns><c>true</c> if <paramref name="left" /> and <paramref name="right" /> are equal; otherwise, <c>false</c>.</returns>
        public static bool operator ==(CString left, CString right)
        {
            return left.Pointer == right.Pointer;
        }

        /// <summary>
        ///     Returns a value that indicates whether two specified <see cref="CBool" /> structures are not equal.
        /// </summary>
        /// <param name="left">The first <see cref="CString" /> to compare.</param>
        /// <param name="right">The second <see cref="CString" /> to compare.</param>
        /// <returns><c>true</c> if <paramref name="left" /> and <paramref name="right" /> are not equal; otherwise, <c>false</c>.</returns>
        public static bool operator !=(CString left, CString right)
        {
            return !(left == right);
        }
    }

    /// <summary>
    ///     Utility methods for interoperability with C style strings in C#.
    /// </summary>
    public static unsafe class CStrings
    {
        /// <summary>
        ///     Converts an array of strings to an array of C strings of type `char` (multi-dimensional array of one
        ///     dimensional byte arrays each terminated by a <c>0x0</c>) by allocating and copying if not already cached.
        /// </summary>
        /// <remarks>
        ///     <para>Calls <see cref="CString" />.</para>
        /// </remarks>
        /// <param name="values">The strings.</param>
        /// <returns>An array pointer of C string pointers. You are responsible for freeing the returned pointer.</returns>
        public static CString* CStringArray(ReadOnlySpan<string> values)
        {
            var pointerSize = IntPtr.Size;
            var result = (CString*)Marshal.AllocHGlobal(pointerSize * values.Length);
            for (var i = 0; i < values.Length; ++i)
            {
                var @string = values[i];
                var cString = CString.FromString(@string);
                result[i] = cString;
            }

            return result;
        }

        /// <summary>
        ///     Converts an array of strings to an array of C strings of type `wchar_t` (multi-dimensional array of one
        ///     dimensional ushort arrays each terminated by a <c>0x0</c>) by allocating and copying if not already cached.
        /// </summary>
        /// <remarks>
        ///     <para>Calls <see cref="CString" />.</para>
        /// </remarks>
        /// <param name="values">The strings.</param>
        /// <returns>An array pointer of C string pointers. You are responsible for freeing the returned pointer.</returns>
        public static CStringWide* CStringWideArray(ReadOnlySpan<string> values)
        {
            var pointerSize = IntPtr.Size;
            var result = (CStringWide*)Marshal.AllocHGlobal(pointerSize * values.Length);
            for (var i = 0; i < values.Length; ++i)
            {
                var @string = values[i];
                var cString = CStringWide.FromString(@string);
                result[i] = cString;
            }

            return result;
        }
    }

    /// <summary>
    ///     A pointer value type that represents a wide string; C type `wchar_t*`.
    /// </summary>
    [StructLayout(LayoutKind.Sequential)]
    public readonly unsafe struct CStringWide : IEquatable<CStringWide>
    {
        public readonly nint Pointer;

        /// <summary>
        ///     Gets a value indicating whether this <see cref="CStringWide" /> is a null pointer.
        /// </summary>
        public bool IsNull => Pointer == 0;

        /// <summary>
        ///     Initializes a new instance of the <see cref="CStringWide" /> struct.
        /// </summary>
        /// <param name="value">The pointer value.</param>
        public CStringWide(byte* value)
        {
            Pointer = (nint)value;
        }

        /// <summary>
        ///     Initializes a new instance of the <see cref="CStringWide" /> struct.
        /// </summary>
        /// <param name="value">The pointer value.</param>
        public CStringWide(nint value)
        {
            Pointer = value;
        }

        /// <summary>
        ///     Initializes a new instance of the <see cref="CStringWide" /> struct.
        /// </summary>
        /// <param name="s">The string value.</param>
        public CStringWide(string s)
        {
            Pointer = FromString(s).Pointer;
        }

        /// <summary>
        ///     Performs an explicit conversion from a <see cref="IntPtr" /> to a <see cref="CStringWide" />.
        /// </summary>
        /// <param name="value">The pointer value.</param>
        /// <returns>
        ///     The resulting <see cref="CStringWide" />.
        /// </returns>
        public static explicit operator CStringWide(nint value)
        {
            return FromIntPtr(value);
        }

        /// <summary>
        ///     Performs an explicit conversion from a <see cref="IntPtr" /> to a <see cref="CStringWide" />.
        /// </summary>
        /// <param name="value">The pointer value.</param>
        /// <returns>
        ///     The resulting <see cref="CStringWide" />.
        /// </returns>
        public static CStringWide FromIntPtr(nint value)
        {
            return new CStringWide(value);
        }

        /// <summary>
        ///     Performs an implicit conversion from a byte pointer to a <see cref="CStringWide" />.
        /// </summary>
        /// <param name="value">The pointer value.</param>
        /// <returns>
        ///     The resulting <see cref="CStringWide" />.
        /// </returns>
        public static implicit operator CStringWide(byte* value)
        {
            return From(value);
        }

        /// <summary>
        ///     Performs an implicit conversion from a byte pointer to a <see cref="CStringWide" />.
        /// </summary>
        /// <param name="value">The pointer value.</param>
        /// <returns>
        ///     The resulting <see cref="CStringWide" />.
        /// </returns>
        public static CStringWide From(byte* value)
        {
            return new CStringWide((nint)value);
        }

        /// <summary>
        ///     Performs an implicit conversion from a <see cref="CStringWide" /> to a <see cref="IntPtr" />.
        /// </summary>
        /// <param name="value">The pointer.</param>
        /// <returns>
        ///     The resulting <see cref="IntPtr" />.
        /// </returns>
        public static implicit operator nint(CStringWide value)
        {
            return value.Pointer;
        }

        /// <summary>
        ///     Performs an implicit conversion from a <see cref="CStringWide" /> to a <see cref="IntPtr" />.
        /// </summary>
        /// <param name="value">The pointer.</param>
        /// <returns>
        ///     The resulting <see cref="IntPtr" />.
        /// </returns>
        public static nint ToIntPtr(CStringWide value)
        {
            return value.Pointer;
        }

        /// <summary>
        ///     Performs an explicit conversion from a <see cref="CStringWide" /> to a <see cref="string" />.
        /// </summary>
        /// <param name="value">The <see cref="CStringWide" />.</param>
        /// <returns>
        ///     The resulting <see cref="string" />.
        /// </returns>
        public static explicit operator string(CStringWide value)
        {
            return ToString(value);
        }

        /// <summary>
        ///     Converts a C style string (unicode) of type `wchar_t` (one dimensional ushort array
        ///     terminated by a <c>0x0</c>) to a UTF-16 <see cref="string" /> by allocating and copying.
        /// </summary>
        /// <param name="value">A pointer to the C string.</param>
        /// <returns>A <see cref="string" /> equivalent of <paramref name="value" />.</returns>
        public static string ToString(CStringWide value)
        {
            if (value.IsNull)
            {
                return string.Empty;
            }

            // calls ASM/C/C++ functions to calculate length and then "FastAllocate" the string with the GC
            // https://mattwarren.org/2016/05/31/Strings-and-the-CLR-a-Special-Relationship/
            var result = Marshal.PtrToStringUni(value.Pointer);

            if (string.IsNullOrEmpty(result))
            {
                return string.Empty;
            }

            return result;
        }

        /// <summary>
        ///     Performs an explicit conversion from a <see cref="string" /> to a <see cref="CStringWide" />.
        /// </summary>
        /// <param name="s">The <see cref="string" />.</param>
        /// <returns>
        ///     The resulting <see cref="CStringWide" />.
        /// </returns>
        public static explicit operator CStringWide(string s)
        {
            return FromString(s);
        }

        /// <summary>
        ///     Converts a C string pointer (one dimensional byte array terminated by a
        ///     <c>0x0</c>) for a specified <see cref="string" /> by allocating and copying if not already cached.
        /// </summary>
        /// <param name="str">The <see cref="string" />.</param>
        /// <returns>A C string pointer.</returns>
        public static CStringWide FromString(string str)
        {
            var pointer = Marshal.StringToHGlobalUni(str);
            return new CStringWide(pointer);
        }

        /// <inheritdoc />
        public override string ToString()
        {
            return ToString(this);
        }

        /// <inheritdoc />
        public override bool Equals(object? obj)
        {
            return obj is CStringWide value && Equals(value);
        }

        /// <inheritdoc />
        public bool Equals(CStringWide other)
        {
            return Pointer == other.Pointer;
        }

        /// <inheritdoc />
        public override int GetHashCode()
        {
            return Pointer.GetHashCode();
        }

        /// <summary>
        ///     Returns a value that indicates whether two specified <see cref="CStringWide" /> structures are equal.
        /// </summary>
        /// <param name="left">The first <see cref="CStringWide" /> to compare.</param>
        /// <param name="right">The second <see cref="CStringWide" /> to compare.</param>
        /// <returns><c>true</c> if <paramref name="left" /> and <paramref name="right" /> are equal; otherwise, <c>false</c>.</returns>
        public static bool operator ==(CStringWide left, CStringWide right)
        {
            return left.Pointer == right.Pointer;
        }

        /// <summary>
        ///     Returns a value that indicates whether two specified <see cref="CBool" /> structures are not equal.
        /// </summary>
        /// <param name="left">The first <see cref="CStringWide" /> to compare.</param>
        /// <param name="right">The second <see cref="CStringWide" /> to compare.</param>
        /// <returns><c>true</c> if <paramref name="left" /> and <paramref name="right" /> are not equal; otherwise, <c>false</c>.</returns>
        public static bool operator !=(CStringWide left, CStringWide right)
        {
            return !(left == right);
        }

        /// <summary>
        ///     Returns a value that indicates whether two specified <see cref="CStringWide" /> structures are equal.
        /// </summary>
        /// <param name="left">The first <see cref="CStringWide" /> to compare.</param>
        /// <param name="right">The second <see cref="CStringWide" /> to compare.</param>
        /// <returns><c>true</c> if <paramref name="left" /> and <paramref name="right" /> are equal; otherwise, <c>false</c>.</returns>
        public static bool Equals(CStringWide left, CStringWide right)
        {
            return left.Pointer == right.Pointer;
        }
    }
}
