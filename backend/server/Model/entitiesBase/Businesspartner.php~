<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Businesspartner
 *
 * @ORM\Table(name="businesspartner", uniqueConstraints={@ORM\UniqueConstraint(name="id_UNIQUE", columns={"id"}), @ORM\UniqueConstraint(name="number_UNIQUE", columns={"registration_code"})}, indexes={@ORM\Index(name="city_idx", columns={"city_id"})})
 * @ORM\Entity
 */
class Businesspartner
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=45, nullable=false)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="registration_code", type="string", length=45, nullable=false)
     */
    private $registrationCode;

    /**
     * @var string
     *
     * @ORM\Column(name="adress", type="string", length=200, nullable=true)
     */
    private $adress;

    /**
     * @var string
     *
     * @ORM\Column(name="partner_type", type="string", length=10, nullable=false)
     */
    private $partnerType = 'C';

    /**
     * @var string
     *
     * @ORM\Column(name="acess_name", type="string", length=45, nullable=true)
     */
    private $acessName;

    /**
     * @var string
     *
     * @ORM\Column(name="email", type="string", length=45, nullable=true)
     */
    private $email;

    /**
     * @var string
     *
     * @ORM\Column(name="password", type="string", length=45, nullable=true)
     */
    private $password;

    /**
     * @var \City
     *
     * @ORM\ManyToOne(targetEntity="City")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="city_id", referencedColumnName="id")
     * })
     */
    private $city;


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     * @return Businesspartner
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set registrationCode
     *
     * @param string $registrationCode
     * @return Businesspartner
     */
    public function setRegistrationCode($registrationCode)
    {
        $this->registrationCode = $registrationCode;

        return $this;
    }

    /**
     * Get registrationCode
     *
     * @return string 
     */
    public function getRegistrationCode()
    {
        return $this->registrationCode;
    }

    /**
     * Set adress
     *
     * @param string $adress
     * @return Businesspartner
     */
    public function setAdress($adress)
    {
        $this->adress = $adress;

        return $this;
    }

    /**
     * Get adress
     *
     * @return string 
     */
    public function getAdress()
    {
        return $this->adress;
    }

    /**
     * Set partnerType
     *
     * @param string $partnerType
     * @return Businesspartner
     */
    public function setPartnerType($partnerType)
    {
        $this->partnerType = $partnerType;

        return $this;
    }

    /**
     * Get partnerType
     *
     * @return string 
     */
    public function getPartnerType()
    {
        return $this->partnerType;
    }

    /**
     * Set acessName
     *
     * @param string $acessName
     * @return Businesspartner
     */
    public function setAcessName($acessName)
    {
        $this->acessName = $acessName;

        return $this;
    }

    /**
     * Get acessName
     *
     * @return string 
     */
    public function getAcessName()
    {
        return $this->acessName;
    }

    /**
     * Set email
     *
     * @param string $email
     * @return Businesspartner
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get email
     *
     * @return string 
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set password
     *
     * @param string $password
     * @return Businesspartner
     */
    public function setPassword($password)
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Get password
     *
     * @return string 
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * Set city
     *
     * @param \City $city
     * @return Businesspartner
     */
    public function setCity(\City $city = null)
    {
        $this->city = $city;

        return $this;
    }

    /**
     * Get city
     *
     * @return \City 
     */
    public function getCity()
    {
        return $this->city;
    }
    /**
     * @var string
     *
     * @ORM\Column(name="phone_number", type="string", length=45, nullable=false)
     */
    private $phoneNumber;


    /**
     * Set phoneNumber
     *
     * @param string $phoneNumber
     * @return Businesspartner
     */
    public function setPhoneNumber($phoneNumber)
    {
        $this->phoneNumber = $phoneNumber;

        return $this;
    }

    /**
     * Get phoneNumber
     *
     * @return string 
     */
    public function getPhoneNumber()
    {
        return $this->phoneNumber;
    }
}
